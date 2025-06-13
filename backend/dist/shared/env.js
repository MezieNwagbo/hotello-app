"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FRONTEND_URL = exports.MONGODB_CONNECTION_STRING = exports.JWT_SECRET_KEY = void 0;
require("dotenv/config");
exports.JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;
exports.MONGODB_CONNECTION_STRING = process.env.MONGODB_CONNECTION_STRING;
exports.FRONTEND_URL = process.env.FRONTEND_URL;
