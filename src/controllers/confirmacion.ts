import { Request, Response } from "express"
import { ConfirmacionModel } from "../models/confirmacion"
import { GlobalErrorHandler } from "../utils/error.handler"

export class ConfirmacionController {
  static async getAll (req: Request, res: Response) {
    try{
      const confirmaciones = await ConfirmacionModel.getAll()
      res.json({data: confirmaciones})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}