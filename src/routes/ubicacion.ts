import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import { UbicacionController } from "../controllers/ubicacion";

export const ubicacionRouter = Router();

ubicacionRouter.get("/", AuthMiddleware(["COORDINADOR"]), UbicacionController.getAll)
ubicacionRouter.post("/", AuthMiddleware(), UbicacionController.create)
ubicacionRouter.patch("/:id", AuthMiddleware(), UbicacionController.edit)
ubicacionRouter.delete("/:id", AuthMiddleware(), UbicacionController.delete)


ubicacionRouter.get("/:id", AuthMiddleware(), UbicacionController.getById)
