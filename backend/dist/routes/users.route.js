"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("../controller/user.controller");
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const validateRegisterData = [
    (0, express_validator_1.check)("firstName", "First name is required").isString(),
    (0, express_validator_1.check)("lastName", "Last name is required").isString(),
    (0, express_validator_1.check)("email", "Email is required").isEmail(),
    (0, express_validator_1.check)("password", "Password must contain a symbol, an uppercase letter, a lowercase letter and must be 6 xters long").isStrongPassword({
        minLength: 6,
        minSymbols: 1,
        minNumbers: 1,
        minLowercase: 1,
        minUppercase: 1,
    }),
];
router.post("/register", validateRegisterData, user_controller_1.registerHandler);
exports.default = router;
