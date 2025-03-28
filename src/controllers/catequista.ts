import { Request, Response } from "express"
import { CatequistaModel } from "../models/catequista"
import { ServerErrorHandler } from "../utils/error.handler"

const catequistaModel = new CatequistaModel()

export class CatequistaController {
  static async getAll (req: Request, res: Response) {
    try{
      const [catequistas] = await catequistaModel.getAll()
      res.json({data: catequistas})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const catequista = await catequistaModel.getById({id})
      res.json({data: catequista})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
  static async activate (req: Request, res: Response) {
    try{
      const {id} = req.params
      const result = await catequistaModel.activate({id})
      if(!!result.error) res.status(400).json({error: result.error})
      res.json({data: result})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
}