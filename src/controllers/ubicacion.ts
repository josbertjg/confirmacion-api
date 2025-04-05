import { Request, Response } from "express"
import { GlobalErrorHandler } from "../utils/error.handler"
import { UbicacionModel } from "../models/ubicacion"

export class UbicacionController {
  static async getAll (req: Request, res: Response) {
    try{
      const grupos_vida = await UbicacionModel.getAll()
      res.json({data: grupos_vida})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const grupo_vida = await UbicacionModel.getById({id: +id})
      res.json({data: grupo_vida})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}