import type { Option, JSONValue } from '@w5s/core';
import type { Task } from '@w5s/task';
import type { Method } from '@w5s/http';
import { Client } from '@w5s/http/dist/Client.js';
import { requestSend } from '@w5s/http/dist/requestSend.js';
import { ResponseParser } from '@w5s/http/dist/ResponseParser.js';
import { HTTPError } from '@w5s/http/dist/HTTPError.js';
import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';
import { Tag } from '@w5s/core/dist/Tag.js';
import { Enum } from '@w5s/core/dist/Enum.js';
import { CodecError } from '@w5s/core/dist/CodecError.js';
import { mapResult } from '@w5s/task/dist/Task/mapResult.js';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { Error as Err } from '@w5s/core/dist/Result/Error.js';
import { TimeoutError } from '@w5s/error/dist/TimeoutError.js';
import { andThen } from '@w5s/task/dist/Task/andThen.js';

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
   * HTTP client
   */
  readonly httpClient: Client;
}
export function Slack({
  baseURL: slackBaseURL = 'https://slack.com/api',
  token: slackToken,
  httpClient = Client(),
}: {
  baseURL?: Slack['slackBaseURL'];
  token: Slack['slackToken'];
  httpClient?: Client;
}): Slack {
  return {
    slackBaseURL,
    slackToken,
    httpClient,
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

  export class Error extends ErrorClass({ errorName: 'SlackError' })<{ slackErrorCode: ErrorCode }> {}

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

  type ResponseError = CodecError | HTTPError | TimeoutError | Error;

  function apiCall<R>(client: Slack, method: Method, parameters: { [key: string]: unknown }): Task<R, ResponseError> {
    const { httpClient } = client;
    const request = requestSend(httpClient, {
      url: urlWithQuery(`${client.slackBaseURL}/${method}`, {
        token: client.slackToken,
        ...parameters,
      }),
      method: 'POST',
    });
    const parsed = andThen(request, ResponseParser.json<ResponseBase>('unsafe'));
    const requestParsed = mapResult<ResponseBase, HTTPError, R, ResponseError>(parsed, (result) =>
      result.ok
        ? result.value.ok === true
          ? Ok(result.value as R)
          : result.value.ok === false
            ? Err(new Error({ message: 'Slack Error!', slackErrorCode: result.value.error }))
            : Err(new CodecError({ message: 'Decode Error!', input: result.value }))
        : result,
    );
    return requestParsed;
  }

  export namespace Chat {
    export function postMessage(client: Slack, request: postMessage.Request) {
      return apiCall<postMessage.Response>(client, 'chat.postMessage', { as_user: 'true', ...request });
    }
    export namespace postMessage {
      export interface Request extends Readonly<{
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
