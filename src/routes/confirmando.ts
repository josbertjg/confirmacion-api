import { Router } from "express";
import { ConfirmandoController } from "../controllers/confirmando"
import { AuthMiddleware } from "../middlewares/auth";

export const confirmandoRouter = Router();

confirmandoRouter.get("/", AuthMiddleware(["COORDINADOR", "CATEQUISTA", "AUXILIAR"]), ConfirmandoController.getAll)
confirmandoRouter.get("/:id", AuthMiddleware(["ADMIN"]), ConfirmandoController.getById)
confirmandoRouter.post("/inscribir/:id", AuthMiddleware(["COORDINADOR"]), ConfirmandoController.inscribir)


