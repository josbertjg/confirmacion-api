import { Router } from "express";
import { CatequesisController } from "../controllers/catequesis";
import { AuthMiddleware } from "../middlewares/auth";

export const catequesisRouter = Router();

catequesisRouter.get("/", AuthMiddleware(["COORDINADOR", "CATEQUISTA", "AUXILIAR"]), CatequesisController.getAll)
catequesisRouter.post("/", AuthMiddleware(["COORDINADOR"]), CatequesisController.create)

catequesisRouter.get("/:id", AuthMiddleware(["ADMIN"]), CatequesisController.getById)
catequesisRouter.put("/:id", AuthMiddleware(["COORDINADOR", "CATEQUISTA", "AUXILIAR"]), CatequesisController.update)
catequesisRouter.delete("/:id", AuthMiddleware(["COORDINADOR"]), CatequesisController.delete)

