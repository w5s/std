import type { JSONValue, Option } from '@w5s/core';
import type { Method } from '@w5s/http';
import type { Task } from '@w5s/task';

import { CodecError } from '@w5s/core/dist/CodecError.js';
import { Enum } from '@w5s/core/dist/Enum.js';
import { Error as Err } from '@w5s/core/dist/Result/Error.js';
import { Ok } from '@w5s/core/dist/Result/Ok.js';
import { Tag } from '@w5s/core/dist/Tag.js';
import { ErrorClass } from '@w5s/error/dist/ErrorClass.js';
import { TimeoutError } from '@w5s/error/dist/TimeoutError.js';
import { Client } from '@w5s/http/dist/Client.js';
import { HTTPError } from '@w5s/http/dist/HTTPError.js';
import { requestSend } from '@w5s/http/dist/requestSend.js';
import { ResponseParser } from '@w5s/http/dist/ResponseParser.js';
import { andThen } from '@w5s/task/dist/Task/andThen.js';
import { mapResult } from '@w5s/task/dist/Task/mapResult.js';

export interface Slack {
  /**
   * HTTP client
   */
  readonly httpClient: Client;

  /**
   * Slack base URL
   */
  readonly slackBaseURL: string;

  /**
   * Slack API token
   */
  readonly slackToken: string;
}
export function Slack({
  baseURL: slackBaseURL = 'https://slack.com/api',
  httpClient = Client(),
  token: slackToken,
}: {
  baseURL?: Slack['slackBaseURL'];
  httpClient?: Client;
  token: Slack['slackToken'];
}): Slack {
  return {
    httpClient,
    slackBaseURL,
    slackToken,
  };
}

export namespace Slack {
  export type ChannelId = Id<'SlackChannelId'>;

  type Id<T extends string> = string & Tag<T>;

  // export type URL = string;

  function MakeId<IdType extends Id<any>>(typeName: string) {
    return Tag.define<string, IdType>({ hasInstance: (anyValue) => typeof anyValue === 'string', typeName });
  }
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

  type ResponseBase =
    | { [key: string]: JSONValue; ok: true }
    | { error: ErrorCode; ok: false }
    | { ok: Exclude<JSONValue, boolean> };

  type ResponseError = CodecError | Error | HTTPError | TimeoutError;

  // const TResponseError = Type.Object({
  //   ok: Type.Boolean.False,
  //   error: ErrorCode,
  // });
  // type TResponseError = Type.TypeOf<typeof TResponseError>;

  export class Error extends ErrorClass({ errorName: 'SlackError' })<{ slackErrorCode: ErrorCode }> {}

  function apiCall<R>(client: Slack, method: Method, parameters: Record<string, unknown>): Task<R, ResponseError> {
    const { httpClient } = client;
    const request = requestSend(httpClient, {
      method: 'POST',
      url: urlWithQuery(`${client.slackBaseURL}/${method}`, {
        token: client.slackToken,
        ...parameters,
      }),
    });
    const parsed = andThen(request, ResponseParser.json<ResponseBase>('unsafe'));
    const requestParsed = mapResult<ResponseBase, HTTPError, R, ResponseError>(parsed, (result) =>
      result.ok
        ? result.value.ok === true
          ? Ok(result.value as R)
          : result.value.ok === false
            ? Err(new Error({ message: 'Slack Error!', slackErrorCode: result.value.error }))
            : Err(new CodecError({ input: result.value, message: 'Decode Error!' }))
        : result,
    );
    return requestParsed;
  }

  function urlWithQuery(url: string, parameters: Record<string, string>) {
    const urlObject = new URL(url);
    for (const [key, value] of Object.entries(parameters)) {
      urlObject.searchParams.append(key, value);
    }
    return urlObject.toString();
  }

  export namespace Chat {
    export function postMessage(client: Slack, request: postMessage.Request) {
      return apiCall<postMessage.Response>(client, 'chat.postMessage', { as_user: 'true', ...request });
    }
    export namespace postMessage {
      export interface Request extends Readonly<{
        // blocks?: Array<unknown>;
        attachments?: Array<unknown>;
        channel?: Option<Slack.ChannelId>;
        // username?: Slack.UserId;
        text?: Option<string>;
      }> {}
      export type Response = void;
    }
  }
}
