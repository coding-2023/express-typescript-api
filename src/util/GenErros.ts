import { Resp } from "./tsrequest";

export type TSDictionary<T = any> = {
  [k: string]: T;
};

export interface IError {
  name: string;
  status: number;
  message: string;
  info?: TSDictionary<any>;
}

export abstract class HTTPClientError extends Error {
  public readonly info?: TSDictionary<any>;
  public readonly e = {} as IError;

  protected constructor(
    status: Resp,
    name: string,
    message: string,
    info?: TSDictionary<any>
  ) {
    super(message);
    this.e = { name, status, message };
  }
}

export class NotFoundError extends HTTPClientError {
  constructor(message: string = "Error", info?: TSDictionary) {
    super(Resp.NotFound, "ERR_NOT_FOUND", message, info);
  }
}

export class OtherError extends HTTPClientError {
  constructor(message: string = "Error", info?: TSDictionary) {
    super(Resp.InternalError, "ITERNAL_ERROR", message, info);
  }
}
