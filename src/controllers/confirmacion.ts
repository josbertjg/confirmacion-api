import { Request, Response } from "express"
import { ConfirmacionModel } from "../models/confirmacion"
import { ServerErrorHandler } from "../utils/error.handler"

const confirmacionModel = new ConfirmacionModel()

export class ConfirmacionController {
  static async getAll (req: Request, res: Response) {
    try{
      const [confirmaciones] = await confirmacionModel.getAll()
      res.json({data: confirmaciones})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
}