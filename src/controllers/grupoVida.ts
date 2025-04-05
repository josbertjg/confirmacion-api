import { Request, Response } from "express"
import { GlobalErrorHandler } from "../utils/error.handler"
import { GrupoVidaModel } from "../models/grupoVida"

export class GrupoVidaController {
  static async getAll (req: Request, res: Response) {
    try{
      const grupos_vida = await GrupoVidaModel.getAll()
      res.json({data: grupos_vida})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const grupo_vida = await GrupoVidaModel.getById({id: id})
      res.json({data: grupo_vida})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}