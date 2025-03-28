import { Router } from "express";
import { ConfirmacionController } from "../controllers/confirmacion";
export const confirmacionRouter = Router();
confirmacionRouter.get("/", ConfirmacionController.getAll);
