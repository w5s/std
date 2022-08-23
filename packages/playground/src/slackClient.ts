/* eslint-disable @typescript-eslint/naming-convention */
import { JSONValue, Option, Tag, TimeDuration } from '@w5s/core';
import { HTTP, parseJSON } from '@w5s/http';
import { timeout } from './timeout.js';

export interface SlackClient {
  /**
   * Slack API token
   */
  readonly slackToken: string;
  /**
   * HTTP client default request timeout
   */
  readonly slackRequestTimeout: Option<TimeDuration>;
}
export function SlackClient({
  timeout: slackRequestTimeout,
  token: slackToken,
}: {
  timeout?: SlackClient['slackRequestTimeout'];
  token: SlackClient['slackToken'];
}): SlackClient {
  return {
    slackToken,
    slackRequestTimeout,
  };
}

export namespace SlackClient {
  type Id<T> = Tag<string, { slackId: T }>;
  function MakeId<IdType extends Id<any>>() {
    function Id(value: string): IdType {
      return value as unknown as IdType;
    }
    return Id;
  }

  // export type URL = string;

  export type ChannelId = Id<'Channel'>;
  export const ChannelId = MakeId<ChannelId>();

  export type UserId = Id<'User'>;
  export const UserId = MakeId<ChannelId>();

  export type BotId = Id<'Bot'>;
  export const BotId = MakeId<BotId>();

  export type FileId = Id<'File'>;
  export const FileId = MakeId<FileId>();

  export type CommentId = Id<'Comment'>;
  export const CommentId = MakeId<CommentId>();

  export type TeamId = Id<'Team'>;
  export const TeamId = MakeId<TeamId>();

  export type SubTeamId = Id<'SubTeam'>;
  export const SubTeamId = MakeId<SubTeamId>();

  function urlWithQuery(url: string, parameters: { [key: string]: string }) {
    const urlObject = new URL(url);
    for (const [key, value] of Object.entries(parameters)) {
      urlObject.searchParams.append(key, value);
    }
    return urlObject.toString();
  }

  function apiCall<Response extends JSONValue>(
    client: SlackClient,
    method: HTTP.Method,
    parameters: { [key: string]: unknown }
  ) {
    const request = HTTP.request({
      url: urlWithQuery(`https://slack.com/api/${method}`, {
        token: client.slackToken,
        ...parameters,
      }),
      method: 'POST',
      parse: parseJSON<Response>('unsafe'),
    });
    const requestWithTimeout = Option.isSome(client.slackRequestTimeout)
      ? timeout(request, client.slackRequestTimeout)
      : request;
    return requestWithTimeout;
  }

  export function chat_postMessage(client: SlackClient, request: chat_postMessage.Request) {
    return apiCall<chat_postMessage.Response>(client, 'chat.postMessage', { as_user: 'true', ...request });
  }
  export namespace chat_postMessage {
    export interface Request
      extends Readonly<{
        // username?: SlackClient.UserId;
        text?: Option<string>;
        channel?: Option<SlackClient.ChannelId>;
        // blocks?: Array<unknown>;
        attachments?: Array<unknown>;
      }> {}
    export interface Response
      extends Readonly<{
        ok: boolean;
      }> {}
  }
}
