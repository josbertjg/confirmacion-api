import { Router } from "express";
import { ParroquiaController } from "../controllers/parroquia.js";

export const parroquiaRouter = Router();

parroquiaRouter.get("/", ParroquiaController.getAll)
parroquiaRouter.get("/:id", ParroquiaController.getById)


