import { Request, Response } from "express"
import { ConfirmandoModel } from "../models/confirmando"
import { GlobalErrorHandler } from "../utils/error.handler"

export class ConfirmandoController {
  static async getAll (req: Request, res: Response) {
    try{
      const confirmando = await ConfirmandoModel.getAll()
      res.json({data: confirmando})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const confirmando = await ConfirmandoModel.getById({id})
      res.json({data: confirmando})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async inscribir (req: Request, res: Response) {
    try{
      const {id} = req.params
      const response = await ConfirmandoModel.inscribir({id})
      res.json({data: response})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}