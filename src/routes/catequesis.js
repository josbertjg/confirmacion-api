import { Router } from "express";
import { CatequesisController } from "../controllers/catequesis.js";

export const catequesisRouter = Router();

catequesisRouter.get("/", CatequesisController.getAll)
catequesisRouter.post("/", CatequesisController.create)

catequesisRouter.get("/:id", CatequesisController.getById)
catequesisRouter.put("/:id", CatequesisController.update)
catequesisRouter.delete("/:id", CatequesisController.delete)

