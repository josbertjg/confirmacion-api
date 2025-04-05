import { Request, Response } from "express"
import { GlobalErrorHandler } from "../utils/error.handler"
import { NotificationModel } from "../models/notification"
import { AuthRequest } from "../schemas/middlewares"

export class NotificationController {
  static async getAll (req: AuthRequest, res: Response) {
    try{
      const notifications = await NotificationModel.getAll({id: req.user?.id!})
      res.json({data: notifications})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const notification = await NotificationModel.getById({id: id})
      res.json({data: notification})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}