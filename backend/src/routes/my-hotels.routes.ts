import express from "express";
import multer from "multer";

import { addHotelHandler } from "../controller/my-hotel.controller";

import { body } from "express-validator";

// import { check } from "express-validator";
import verifyToken from "../middleware/auth.middleware";

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});

const validateHotelData = [
  body("name").notEmpty().withMessage("Name is required"),
  body("city").notEmpty().withMessage("City is required"),
  body("country").notEmpty().withMessage("Country is required"),
  body("description").notEmpty().withMessage("Description is required"),
  body("type").notEmpty().withMessage("Hotel type is required"),
  body("pricePerNight")
    .notEmpty()
    .isNumeric()
    .withMessage("Price per night is required and must be a number"),
  body("facilities")
    .notEmpty()
    .isArray()
    .withMessage("Facilities are required"),
];

router.post(
  "/",
  verifyToken,
  validateHotelData,
  upload.array("imageFiles", 6),
  addHotelHandler
);

export default router;
