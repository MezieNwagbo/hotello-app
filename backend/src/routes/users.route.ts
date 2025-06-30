import express from "express";
import {
  registerHandler,
  getLoggedInUserHandler,
} from "../controller/user.controller";
import { check } from "express-validator";
import verifyToken from "../middleware/auth.middleware";

const router = express.Router();

const validateRegisterData = [
  check("firstName", "First name is required").isString(),
  check("lastName", "Last name is required").isString(),
  check("email", "Email is required").isEmail(),
  check(
    "password",
    "Password must contain a symbol, an uppercase letter, a lowercase letter and must be 6 xters long"
  ).isStrongPassword({
    minLength: 6,
    minSymbols: 1,
    minNumbers: 1,
    minLowercase: 1,
    minUppercase: 1,
  }),
];

router.get("/me", verifyToken, getLoggedInUserHandler);
router.post("/register", validateRegisterData, registerHandler);

export default router;
