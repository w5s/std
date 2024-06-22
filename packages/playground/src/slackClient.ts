import type { Option, JSONValue, Task } from '@w5s/core';
import type { TimeDuration } from '@w5s/time';
import { HTTP, HTTPError, HTTPParser } from '@w5s/http';
import { CustomError } from '@w5s/error';
import { Tag } from '@w5s/core/dist/Tag.js';
import { Enum } from '@w5s/core/dist/Enum.js';
import { DecodeError } from '@w5s/core/dist/DecodeError.js';
import { mapResult } from '@w5s/core/dist/Task/mapResult.js';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { Error as Err } from '@w5s/core/dist/Result/Error.js';
import { TimeoutError, timeout } from './timeout.js';

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

  export const ErrorCode = Enum.define({
    AsUserNotSupported: 'as_user_not_supported',
    ChannelNotFound: 'channel_not_found',
  });
  export type ErrorCode = Enum.ValueOf<typeof ErrorCode>;

  export interface Error extends CustomError<{ name: 'SlackError'; slackErrorCode: ErrorCode }> {}
  export const Error = CustomError.define<Error>({ errorName: 'SlackError' });

  function urlWithQuery(url: string, parameters: { [key: string]: string }) {
    const urlObject = new URL(url);
    for (const [key, value] of Object.entries(parameters)) {
      urlObject.searchParams.append(key, value);
    }
    return urlObject.toString();
  }

  // const TResponseError = Type.Object({
  //   ok: Type.Boolean.False,
  //   error: ErrorCode,
  // });
  // type TResponseError = Type.TypeOf<typeof TResponseError>;

  type ResponseBase =
    | { ok: true; [key: string]: JSONValue }
    | { ok: false; error: ErrorCode }
    | { ok: Exclude<JSONValue, boolean> };

  type ResponseError = DecodeError | HTTPError | TimeoutError | Error;

  function apiCall<R>(
    client: Slack,
    method: HTTP.Method,
    parameters: { [key: string]: unknown }
  ): Task<R, ResponseError> {
    const request = HTTP.request({
      url: urlWithQuery(`${client.slackBaseURL}/${method}`, {
        token: client.slackToken,
        ...parameters,
      }),
      method: 'POST',
      parse: HTTPParser.json<ResponseBase>('unsafe'),
    });
    const requestParsed = mapResult<ResponseBase, HTTPError, R, ResponseError>(request, (result) =>
      result.ok
        ? result.value.ok === true
          ? Ok(result.value as R)
          : result.value.ok === false
            ? Err(Error({ message: 'Slack Error!', slackErrorCode: result.value.error }))
            : Err(DecodeError({ message: 'Decode Error!', input: result.value }))
        : result
    );
    const requestWithTimeout =
      client.slackRequestTimeout == null ? requestParsed : timeout(requestParsed, client.slackRequestTimeout);
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
      export type Response = void;
    }
  }
}
