import express from "express";
import {
  loginHandler,
  validateTokenHandler,
  logoutHandler,
} from "../controller/auth.controller";
import { check } from "express-validator";
import verifyToken from "../middleware/auth.middleware";

const router = express.Router();

const validateLoginData = [check("email", "Email is required").isEmail()];

router.post("/login", validateLoginData, loginHandler);
router.get("/validate-token", verifyToken, validateTokenHandler);
router.post("/logout", logoutHandler);

export default router;
