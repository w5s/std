export interface Response
  extends Readonly<
    Omit<globalThis.Response, /* 'headers' | */ 'clone'> & {
      // headers: Readonly<{ [key: string]: string }>;
    }
  > {}
