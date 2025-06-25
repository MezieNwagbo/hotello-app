import express from "express";

import { handleHotelSearch } from "../controller/hotel.controller";

const router = express.Router();

router.get("/search", handleHotelSearch);

export default router;
