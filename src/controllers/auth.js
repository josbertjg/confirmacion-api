import { AuthModel } from "../models/auth.js"
import { validateInputConfirmando } from "../schemas/confirmando.js"
import { ErrorInputsHandler } from "../utils/errorHandler.js"

const authModel = new AuthModel()

export class AuthController {
  static async createConfirmando (req, res) {
    try{
      const validation = await validateInputConfirmando(req.body)
      if(!validation.success) return res.status(400).json(ErrorInputsHandler(validation.error))
  
      const result = await authModel.createConfirmando(req.body)
      if(!!result.error) return res.status(400).json({error: result.error})

      res.json({data: result})
    }catch(e){
      res.status(500).json({error: "A server error ocurred, try again later"})
      console.log(e)
    }
  }
}