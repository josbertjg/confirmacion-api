import { Request, Response } from "express"
import { UserModel } from "../models/user"
import { GlobalErrorHandler } from "../utils/error.handler"
import { AuthRequest } from "../schemas/middlewares"

export class UserController {
  static async getAll(req: Request, res: Response) {
    try{
      const catequistas = await UserModel.getAll()
      res.json({data: catequistas})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async getById(req: Request, res: Response) {
    try{
      const {id} = req.params
      const catequista = await UserModel.getById({id})
      res.json({data: catequista})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async me(req: AuthRequest, res: Response) {
    try{
      const userMe = await UserModel.me(req.user!)
      res.json({data: userMe})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}