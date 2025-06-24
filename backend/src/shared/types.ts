import type { NextFunction, Request, Response } from "express";

export type AsynFunctionType = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;
