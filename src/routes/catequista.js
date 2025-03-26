import { Router } from "express";
import { CatequistaController } from "../controllers/catequista.js";

export const catequistaRouter = Router();

catequistaRouter.get("/", CatequistaController.getAll)
catequistaRouter.get("/:id", CatequistaController.getById)
catequistaRouter.post("/activate/:id", CatequistaController.activate)
