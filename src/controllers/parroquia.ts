import { Request, Response } from "express"
import { ParroquiaModel } from "../models/parroquia"
import { ServerErrorHandler } from "../utils/error.handler"


const parroquiaModel = new ParroquiaModel()

export class ParroquiaController {
  static async getAll (req: Request, res: Response) {
    try{
      const [parroquias] = await parroquiaModel.getAll()
      res.json({data: parroquias})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }

  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const parroquia = await parroquiaModel.getById({id})
      res.json({data: parroquia})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
}