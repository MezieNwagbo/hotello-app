import express, { Request, Response } from "express";
import verifyToken from "../middleware/auth.middleware";

import { getMyBookingsHandler } from "../controller/my-bookings.controller";

const router = express.Router();

// /api/my-bookings
router.get("/", verifyToken, getMyBookingsHandler);

export default router;
