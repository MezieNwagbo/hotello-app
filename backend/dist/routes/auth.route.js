"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const express_validator_1 = require("express-validator");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
const router = express_1.default.Router();
const validateLoginData = [(0, express_validator_1.check)("email", "Email is required").isEmail()];
router.post("/login", validateLoginData, auth_controller_1.loginHandler);
router.get("/validate-token", auth_middleware_1.default, auth_controller_1.validateTokenHandler);
router.post("/logout", auth_controller_1.logoutHandler);
exports.default = router;
