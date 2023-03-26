import { APIServer } from "./server";
import { PORT } from "../env-config";
import ora from "ora";
import { userRoutes } from "./routes/user";
import { IErrorSchema, errors } from "./errors";
import { customerRoutes } from "./routes/customer.route";
import { NextFunction, Request, Response } from "express";
import { IError, NotFoundError } from "./util/GenErros";
import { PrismaClient } from "@prisma/client";
// import { pinoHttp } from "pino-http";

function routes(api: APIServer): void {
  userRoutes(api);
  customerRoutes(api);
}

export async function server_start(api: APIServer): Promise<void> {
  routes(api);

  // api.server.use(pinoHttp);
  // api.server.use((req: Request, res: Response, next: NextFunction) =>
  //   console.log("abc ")
  // );
  api.server.use(errors());
  // api.server.use("*", (req: Request, res: Response, next: NextFunction) => {
  //   const e = new NotFoundError(`Connot ${req.method} ${req.originalUrl}`);
  //   next(e);
  // });

  api.server.use(
    (
      error: { e: IErrorSchema },
      req: Request,
      res: Response,
      next: NextFunction
    ) => {
      const { status } = error.e;
      next(res.status(status).send(error));
    }
  );

  // api.server.listen(
  //   PORT || 8080,
  //   () =>
  //     (ora(`Server start at http://localhost:${PORT} \n`).start().color =
  //       "magenta")
  // );
  api.server.listen(PORT || 8080, () =>
    console.log(`Server start at http://localhost:${PORT}`)
  );
}
