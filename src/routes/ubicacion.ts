import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import { UbicacionController } from "../controllers/ubicacion";

export const ubicacionRouter = Router();

ubicacionRouter.get("/", AuthMiddleware(), UbicacionController.getAll)
ubicacionRouter.get("/:id", AuthMiddleware(), UbicacionController.getById)
