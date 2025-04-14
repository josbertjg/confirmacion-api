import { Router } from "express";
import { CatequistaController } from "../controllers/catequista";
import { AuthMiddleware } from "../middlewares/auth";

export const catequistaRouter = Router();

catequistaRouter.get("/", AuthMiddleware(["ADMIN"]), CatequistaController.getAll)
catequistaRouter.get("/:id", AuthMiddleware(["ADMIN"]), CatequistaController.getById)
catequistaRouter.post("/activate/:id", AuthMiddleware(["COORDINADOR"]), CatequistaController.activate)
