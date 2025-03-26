import { AuthModel } from "../models/auth.js"
import { validateInputConfirmando } from "../schemas/confirmando.js"
import { validateUserLogin } from "../schemas/login.js"
import { validateCatequistaRegister } from "../schemas/catequista.js"
import { ErrorInputsHandler, ServerErrorHandler } from "../utils/errorHandler.js"

const authModel = new AuthModel()

export class AuthController {
  static async login (req, res) {
    try{
      const validation = await validateUserLogin(req.body)
      if(!validation.success) return res.status(400).json(ErrorInputsHandler(validation.error))
  
      const result = await authModel.login(req.body)
      if(!!result.error) return res.status(400).json({error: result.error})
        
      res.json({data: result})
    }catch(e){
      res.status(500).json({error: "A server error ocurred, try again later"})
      console.log(e)
    }
  }

  static async registrarConfirmando (req, res) {
    try{
      const validation = await validateInputConfirmando(req.body)
      if(!validation.success) return res.status(400).json(ErrorInputsHandler(validation.error))
  
      const result = await authModel.registrarConfirmando(req.body)
      if(!!result.error) return res.status(400).json({error: result.error})

      res.json({data: result})
    }catch(e){
      res.status(500).json({error: "A server error ocurred, try again later"})
      console.log(e)
    }
  }

  static async registrarCatequista (req, res) {
    try{
      const validation = await validateCatequistaRegister(req.body)
      if(!validation.success) return res.status(400).json(ErrorInputsHandler(validation.error))
  
      const result = await authModel.registrarCatequista(req.body)
      if(!!result.error) return res.status(400).json({error: result.error})
      return res.json({data: result})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
}