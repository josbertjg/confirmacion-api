import { Router } from "express";
import { ConfirmacionController } from "../controllers/confirmacion.js";

export const confirmacionRouter = Router();

confirmacionRouter.get("/", ConfirmacionController.getAll)

