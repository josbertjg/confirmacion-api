import { Router } from "express";
import { ConfirmandoController } from "../controllers/confirmando.js"

export const confirmandoRouter = Router();

confirmandoRouter.get("/", ConfirmandoController.getAll)
confirmandoRouter.get("/:id", ConfirmandoController.getById)
confirmandoRouter.get("/inscribir/:id", ConfirmandoController.inscribir)


