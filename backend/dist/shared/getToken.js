"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getToken = (user) => jsonwebtoken_1.default.sign({ userId: user.id }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1d",
});
exports.getToken = getToken;
