import express from "express";

import { param } from "express-validator";

import {
  handleHotelSearch,
  getHotelDetailsHandler,
} from "../controller/hotel.controller";

const router = express.Router();

const validateHotelId = [
  param("id").notEmpty().withMessage("Hotel ID is required"),
];

router.get("/search", handleHotelSearch);
router.get("/:id", validateHotelId, getHotelDetailsHandler);

export default router;
