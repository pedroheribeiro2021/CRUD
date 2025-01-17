"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("express-async-errors");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const session_routes_1 = require("./routes/session.routes");
const user_routes_1 = require("./routes/user.routes");
const handleError_1 = require("./errors/handleError");
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use((0, cors_1.default)());
exports.app.use("/user", user_routes_1.userRoutes);
exports.app.use("/login", session_routes_1.sessionRoutes);
exports.app.use(handleError_1.handleError);
