import { UserModel } from "../models/user.js"
import { ServerErrorHandler } from "../utils/errorHandler.js"

const userModel = new UserModel()

export class UserController {
  static async getAll (req, res) {
    try{
      const [catequistas] = await userModel.getAll()
      res.json({data: catequistas})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
  static async getById (req, res) {
    try{
      const {id} = req.params
      const catequista = await userModel.getById({id})
      res.json({data: catequista})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
}