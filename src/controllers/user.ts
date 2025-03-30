import { Request, Response } from "express"
import { UserModel } from "../models/user"
import { GlobalErrorHandler } from "../utils/error.handler"

export class UserController {
  static async getAll (req: Request, res: Response) {
    try{
      const catequistas = await UserModel.getAll()
      res.json({data: catequistas})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const catequista = await UserModel.getById({id})
      res.json({data: catequista})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}