import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth";
import { NotificationController } from "../controllers/notification";

export const notificationRouter = Router();

notificationRouter.get("/", AuthMiddleware(), NotificationController.getAll)
notificationRouter.get("/:id", AuthMiddleware(), NotificationController.getById)
