import type { NextFunction, Request, Response } from "express";

export type AsynFunctionType = (
  req: Request,
  res: Response,
  next?: NextFunction
) => Promise<any>;

export type HotelType = {
  _id: string;
  userId: string;
  name: string;
  city: string;
  country: string;
  description: string;
  type: string;
  adultCount: number;
  childCount: number;
  facilities: string[];
  pricePerNight: number;
  starRating: number;
  imageUrls: string[];
};
