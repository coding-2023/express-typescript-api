import express, { Express, Request, Response } from "express";
import * as core from "express-serve-static-core";
import logger from "node-color-log";

export class APIServer {
  readonly server: Express;
  private static instance: APIServer;

  constructor() {
    this.server = express();
    this.server.use(express.json());
  }
  public static api(): APIServer {
    APIServer.instance = new APIServer();

    return APIServer.instance;
  }

  public static errorCelebateHandle(err: any) {}

  public jsonReply<T>(res: Response, statusCode: number, json: T) {
    return res.status(statusCode).send(json);
  }

  public requestError(error: any): void {
    const {
      e: { message },
    } = error;
    console.log("=================================================");
    console.log(`Server error : ${message}`);
    console.log("=================================================");
  }

  private log(
    message: core.Query | core.ParamsDictionary,
    type: "param" | "query" | "body" | "header"
  ) {
    return logger
      .color("yellow")
      .log(`${type}: `)
      .joint()
      .color("cyan")
      .log(JSON.stringify(message, null, 2));
  }

  public request(req: Request<any>) {
    logger
      .color("green")
      .log("===================== param ===========================");
    this.log(req.params, "param");
    logger
      .color("green")
      .log("===================== query ===========================");
    this.log(req.query, "query");
    logger
      .color("green")
      .log("===================== body ===========================");
    this.log(req.body, "body");
    logger
      .color("green")
      .log("===================== header ===========================");
    this.log(req.headers, "header");
  }
}
