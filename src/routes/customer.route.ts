import { Prisma, Customer } from "@prisma/client";
import { APIServer } from "../server";
import { NextFunction, Request, Response } from "express";
import { Resp, handleRequest } from "../util/tsrequest";
import { Segments, celebrate, Joi, SchemaOptions } from "celebrate";
import {
  createCustomer,
  getCustomers,
} from "../controller/customer.controller";

export function customerRoutes(api: APIServer) {
  api.server.post(
    "/customers",
    celebrate({
      [Segments.BODY]: Joi.object().keys({
        first_name: Joi.string().required(),
        middle_name: Joi.string().required(),
        last_name: Joi.string().required(),
        email_address: Joi.string().email().required(),
      }),
    }),
    handleRequest<Prisma.CustomerCreateInput>(async (req, res, next) => {
      try {
        APIServer.api().request(req);
        const data = await createCustomer<Customer>(req, next);

        api.jsonReply(res, Resp.Created, data);
        // res.send(data);
      } catch (e) {
        // console.log(e);
        next(e);
      }
    })
  );

  api.server.get(
    "/customers",
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        APIServer.api().request(req);
        const data = await getCustomers(req, next);

        api.jsonReply(res, Resp.OK, data);
        // res.send(data);
      } catch (e) {
        // console.log(e);
        next(e);
      }
    }
  );
}
