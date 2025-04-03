import { Router } from "express";
import { ConfirmacionController } from "../controllers/confirmacion";
import { AuthMiddleware } from "../middlewares/auth";

export const confirmacionRouter = Router();

confirmacionRouter.get("/", AuthMiddleware(["COORDINADOR","CATEQUISTA","AUXILIAR"]), ConfirmacionController.getAll)

