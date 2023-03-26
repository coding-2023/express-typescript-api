import { APIServer } from "./server";
import { server_start } from "./server-start";
import { prisma } from "./util/prisma.context";

const api = APIServer.api();

server_start(api)
  .then(async () => {
    await prisma.$connect();
    prisma.$on("query", (e) => {
      console.log("Duration: " + e.duration + "ms");
      //   console.log("Params: " + e.params);
      //   console.log("Query: " + e.query);
    })
  })
  .catch(async (e) => {
    console.error(e.message);
    await prisma.$disconnect().then(() => console.log("Server shutdown"));
    process.exit(1);
  });

// import express, { NextFunction, Request, Response } from "express";
// import { Joi, Segments, celebrate, errors } from "celebrate";
// import { PORT } from "../env-config";
// import ora from "ora";

// const app = express();

// const errorLogger = (error: any, request: any, response: any, next: any) => {
//   console.log(`error ${error.message}`);
//   next(error); // calling next middleware
// };

// app.use(express.json());

// app.post(
//   "/users",
//   celebrate({
//     [Segments.BODY]: Joi.object().keys({
//       name: Joi.string().required(),
//     }),
//   }),
//   (err: any, req: Request<{}, {}, { name: string }>, res: Response) => {
//     console.log(err);
//   }
// );
// app.use((error: any, req: any, res: any, next: any) => {
//   console.log(error);
//   console.log("Error Handling Middleware called");
//   console.log("Path: ", req.path);
//   next(); // calling next middleware function or handler
// });

// app.use((req, res, next) => {
//   console.log(req.path);
//   next();
// });

// app.use(errorLogger);

// app.listen(PORT || 8080, () => {
//   //   ora(`Server start at http://localhost:${PORT} \n`).start().color = "magenta";
//   console.log("server start");
// });
