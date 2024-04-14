import { Option, type JSONValue, Tag } from '@w5s/core';
import type { TimeDuration } from '@w5s/time';
import { HTTP, HTTPParser } from '@w5s/http';
import { timeout } from './timeout.js';

export interface Slack {
  /**
   * Slack base URL
   */
  readonly slackBaseURL: string;
  /**
   * Slack API token
   */
  readonly slackToken: string;
  /**
   * HTTP client default request timeout
   */
  readonly slackRequestTimeout: Option<TimeDuration>;
}
export function Slack({
  baseURL: slackBaseURL = 'https://slack.com/api',
  timeout: slackRequestTimeout,
  token: slackToken,
}: {
  baseURL?: Slack['slackBaseURL'];
  timeout?: Slack['slackRequestTimeout'];
  token: Slack['slackToken'];
}): Slack {
  return {
    slackBaseURL,
    slackToken,
    slackRequestTimeout,
  };
}

export namespace Slack {
  type Id<T extends string> = string & Tag<T>;

  function MakeId<IdType extends Id<any>>(typeName: string) {
    return Tag.define<string, IdType>({ typeName, hasInstance: (anyValue) => typeof anyValue === 'string' });
  }

  // export type URL = string;

  export type ChannelId = Id<'SlackChannelId'>;
  export const ChannelId = MakeId<ChannelId>('SlackChannelId');

  export type UserId = Id<'SlackUserId'>;
  export const UserId = MakeId<UserId>('SlackUserId');

  export type BotId = Id<'SlackBotId'>;
  export const BotId = MakeId<BotId>('SlackBotId');

  export type FileId = Id<'SlackFileId'>;
  export const FileId = MakeId<FileId>('SlackFileId');

  export type CommentId = Id<'SlackCommentId'>;
  export const CommentId = MakeId<CommentId>('SlackCommentId');

  export type TeamId = Id<'TeamId'>;
  export const TeamId = MakeId<TeamId>('TeamId');

  export type SubTeamId = Id<'SubTeamId'>;
  export const SubTeamId = MakeId<SubTeamId>('SubTeamId');

  function urlWithQuery(url: string, parameters: { [key: string]: string }) {
    const urlObject = new URL(url);
    for (const [key, value] of Object.entries(parameters)) {
      urlObject.searchParams.append(key, value);
    }
    return urlObject.toString();
  }

  function apiCall<Response extends JSONValue>(
    client: Slack,
    method: HTTP.Method,
    parameters: { [key: string]: unknown }
  ) {
    const request = HTTP.request({
      url: urlWithQuery(`${client.slackBaseURL}/${method}`, {
        token: client.slackToken,
        ...parameters,
      }),
      method: 'POST',
      parse: HTTPParser.json<Response>('unsafe'),
    });
    const requestWithTimeout =
      client.slackRequestTimeout == null ? request : timeout(request, client.slackRequestTimeout);
    return requestWithTimeout;
  }

  export namespace Chat {
    export function postMessage(client: Slack, request: postMessage.Request) {
      return apiCall<postMessage.Response>(client, 'chat.postMessage', { as_user: 'true', ...request });
    }
    export namespace postMessage {
      export interface Request
        extends Readonly<{
          // username?: Slack.UserId;
          text?: Option<string>;
          channel?: Option<Slack.ChannelId>;
          // blocks?: Array<unknown>;
          attachments?: Array<unknown>;
        }> {}
      export interface Response
        extends Readonly<{
          ok: boolean;
        }> {}
    }
  }
}
