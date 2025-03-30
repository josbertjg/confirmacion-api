import { Request, Response } from "express"
import { ParroquiaModel } from "../models/parroquia"
import { GlobalErrorHandler } from "../utils/error.handler"

export class ParroquiaController {
  static async getAll (req: Request, res: Response) {
    try{
      const parroquias = await ParroquiaModel.getAll()
      res.json({data: parroquias})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const parroquia = await ParroquiaModel.getById({id})
      res.json({data: parroquia})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}