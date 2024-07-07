import { Router } from "express";
import { createSessionController } from "../controllers/sessions/sessions.controller";

export const sessionRoutes = Router();

sessionRoutes.post("", createSessionController);
