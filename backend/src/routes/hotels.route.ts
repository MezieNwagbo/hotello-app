import express from "express";
import { param } from "express-validator";

import {
  handleHotelSearch,
  getHotelDetailsHandler,
  paymentIntentHandler,
  createBookingHandler,
} from "../controller/hotel.controller";
import verifyToken from "../middleware/auth.middleware";

const router = express.Router();

const validateHotelId = [
  param("id").notEmpty().withMessage("Hotel ID is required"),
];

router.get("/search", handleHotelSearch);
router.get("/:id", validateHotelId, getHotelDetailsHandler);
router.post(
  "/:hotelId/bookings/payment-intent",
  verifyToken,
  paymentIntentHandler
);
router.post("/:hotelId/bookings", verifyToken, createBookingHandler);

export default router;
