import { Router } from "express";
import { UserController } from "../controllers/user";
import { AuthMiddleware } from "../middlewares/auth";

export const userRouter = Router();

userRouter.get("/", AuthMiddleware(["ADMIN"]), UserController.getAll)
userRouter.get("/:id", AuthMiddleware(["ADMIN"]), UserController.getById)