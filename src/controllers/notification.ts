import { Request, Response } from "express"
import { NotificationModel } from "../models/notification"
import { AuthRequest } from "../schemas/middlewares"

export class NotificationController {
  static async getAll(req: AuthRequest, res: Response) {
    const notifications = await NotificationModel.getAll({ id: req.user?.id! })
    res.json({ data: notifications })
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params
    const notification = await NotificationModel.getById({ id: id })
    res.json({ data: notification })
  }
}