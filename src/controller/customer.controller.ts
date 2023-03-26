import { NextFunction, Request } from "express";
import { Customer } from "../model/customer.model";
import { Prisma, PrismaClient } from "@prisma/client";
import { NotFoundError, OtherError } from "../util/GenErros";
import { logger } from "../util/winston";
import { APIServer } from "../server";

export const createCustomer = async <TRes>(
  req: Request<{}, {}, Prisma.CustomerCreateInput>,
  next: NextFunction
): Promise<any | undefined> => {
  const body = req.body;
  let returnValue = undefined;
  try {
    returnValue = await Customer.instance.create<TRes>({ data: body });
  } catch (e) {
    APIServer.api().requestError(e);
    next(e);
  }

  return returnValue;
};

export const getCustomers = async (req: Request, next: NextFunction) => {
  try {
    return await Customer.instance.findMany();
  } catch (e) {
    APIServer.api().requestError(e);
    next(e);
  }
};
