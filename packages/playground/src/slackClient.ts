import type { Option, JSONValue, Tag } from '@w5s/core';
import type { TimeDuration } from '@w5s/time';
import { HTTP, HTTPParser } from '@w5s/http';
import { timeout } from './timeout.js';

export interface Slack {
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
  timeout: slackRequestTimeout,
  token: slackToken,
}: {
  timeout?: Slack['slackRequestTimeout'];
  token: Slack['slackToken'];
}): Slack {
  return {
    slackToken,
    slackRequestTimeout,
  };
}

export namespace Slack {
  type Id<T extends string> = string & Tag<T>;

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
    client: Slack,
    method: HTTP.Method,
    parameters: { [key: string]: unknown }
  ) {
    const request = HTTP.request({
      url: urlWithQuery(`https://slack.com/api/${method}`, {
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
