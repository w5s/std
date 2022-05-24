/* eslint-disable @typescript-eslint/naming-convention */
import { Option, Tag } from '@w5s/core';
import { HTTPClient, parseJSON } from '@w5s/http-client';
import { URL } from 'node:url';

export interface SlackClient {
  readonly slackAPIToken: string;
}
export function SlackClient(slackAPIToken: string): SlackClient {
  return {
    slackAPIToken,
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

  export type URL = string;

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

  function apiCall(client: SlackClient, method: HTTPClient.Method, parameters: { [key: string]: unknown }) {
    const urlObject = new URL(`https://slack.com/api/${method}`);
    const requestParameters = {
      token: client.slackAPIToken,
      ...parameters,
    };
    for (const [key, value] of Object.entries(requestParameters)) {
      urlObject.searchParams.append(key, value);
    }

    return HTTPClient.request({
      url: urlObject.toString(),
      method: 'POST',
      parse: parseJSON<chat_postMessage.Response>('unsafe'),
    });
  }

  export function chat_postMessage(client: SlackClient, request: chat_postMessage.Request) {
    return apiCall(client, 'chat.postMessage', { as_user: 'true', ...request });
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
