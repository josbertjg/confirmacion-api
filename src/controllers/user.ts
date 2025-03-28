import { Request, Response } from "express"
import { UserModel } from "../models/user"
import { ServerErrorHandler } from "../utils/error.handler"

const userModel = new UserModel()

export class UserController {
  static async getAll (req: Request, res: Response) {
    try{
      const catequistas = await userModel.getAll()
      res.json({data: catequistas})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      const catequista = await userModel.getById({id})
      res.json({data: catequista})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
}