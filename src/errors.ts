import HTTP from "http";
import { CelebrateError, Joi, isCelebrateError } from "celebrate";
import { Request, Response, NextFunction } from "express";
import { IError } from "./util/GenErros";

const internals = {
  DEFAULT_ERRORS_OPTS: {
    statusCode: 400,
  },
};

const validStatusCodes = Object.keys(HTTP.STATUS_CODES).reduce(
  (memo: number[], status) => {
    const statusCode = Number(status);
    if (statusCode > 399 && statusCode < 599) {
      memo.push(statusCode);
    }
    return memo;
  },
  []
);

const ERRORSOPTSSCHEMA = Joi.object({
  statusCode: Joi.number()
    .integer()
    .valid(...validStatusCodes),
  message: Joi.string(),
});

export type IErrorSchema = IError & { validation: Record<string, any> };

export const errors = (opts = {}) => {
  const finalOpts = { ...internals.DEFAULT_ERRORS_OPTS, ...opts };
  Joi.assert(finalOpts, ERRORSOPTSSCHEMA);

  return (
    err: CelebrateError,
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    // If this isn't a Celebrate error, send it to the next error handler
    console.log(err);
    if (!isCelebrateError(err)) {
      return next(err);
    }

    const { statusCode } = finalOpts;

    const validation: Record<string, any> = {};
    // eslint-disable-next-line no-restricted-syntax
    for (const [segment, joiError] of err.details.entries()) {
      validation[segment] = {
        message: joiError.message,
      };
    }

    const result = {
      status: statusCode,
      error: HTTP.STATUS_CODES[statusCode],
      message: err.message,
      validation,
    };
    return next({ e: result });
  };
};
