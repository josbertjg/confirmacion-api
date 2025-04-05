import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import { GrupoVidaController } from "../controllers/grupoVida";

export const grupoVidaRouter = Router();

grupoVidaRouter.get("/", AuthMiddleware(["COORDINADOR"]), GrupoVidaController.getAll)
grupoVidaRouter.get("/:id", AuthMiddleware(), GrupoVidaController.getById)
