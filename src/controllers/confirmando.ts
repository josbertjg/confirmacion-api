import { Request, Response } from "express"
import { ConfirmandoModel } from "../models/confirmando"
import { ServerErrorHandler } from "../utils/error.handler"

const confirmandoModel = new ConfirmandoModel()

export class ConfirmandoController {
  static async getAll (req: Request, res: Response) {
    try{
      const [confirmando] = await confirmandoModel.getAll()
      res.json({data: confirmando})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }

  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const confirmando = await confirmandoModel.getById({id})
      res.json({data: confirmando})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }

  static async inscribir (req: Request, res: Response) {
    try{
      const {id} = req.params
      const response = await confirmandoModel.inscribir({id})
      if(!!response.error) res.status(400).json({error: response.error})
      else res.json({data: response})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
}