import { CelebrateError, Joi, Segments, celebrate, errors } from "celebrate";
import { Request, Response } from "express";
import { APIServer } from "../server";

export function userRoutes(api: APIServer) {
  api.server.get("/", (req: Request<{ id: string }>, res: Response) => {
    const a = req.params.id;
    res.send({ id: 1, name: "Admin" });
  });

  api.server.post(
    "/users",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
      }),
    }),
    (err: any, req: Request<{}, {}, { name: string }>, res: Response) => {
      console.log(err);
    }
  );

}
