import { Request, Response } from "express"
import { CatequistaModel } from "../models/catequista"
import { GlobalErrorHandler } from "../utils/error.handler"

export class CatequistaController {
  static async getAll (req: Request, res: Response) {
    try{
      const catequistas = await CatequistaModel.getAll()
      res.json({data: catequistas})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const catequista = await CatequistaModel.getById({id})
      res.json({data: catequista})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
  static async activate (req: Request, res: Response) {
    try{
      const {id} = req.params
      const result = await CatequistaModel.activate({id})
      res.json({data: result})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}