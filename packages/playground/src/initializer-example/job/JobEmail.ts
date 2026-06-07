import { Type } from '@w5s/core';
import { Console } from '@w5s/console';
import { Job } from '../../job/Job.js';

export const SendEmail = Job
  .define('SendEmail', Type.Object({
    email: Type.string,
    subject: Type.string,
    body: Type.Option(Type.string),
  }))
  .implement((request) => Console.log('Sending email to', request));
