"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sessionRoutes = void 0;
const express_1 = require("express");
const sessions_controller_1 = require("../controllers/sessions/sessions.controller");
exports.sessionRoutes = (0, express_1.Router)();
exports.sessionRoutes.post("", sessions_controller_1.createSessionController);
