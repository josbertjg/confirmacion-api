import { AuthModel } from "../models/auth"
import { validateInputConfirmando } from "../schemas/confirmando"
import { validateUserLogin } from "../schemas/login"
import { validateCatequistaRegister } from "../schemas/catequista"
import { GlobalErrorHandler } from "../utils/error.handler"
import { Request, Response } from "express"
import { ValidationError } from "../utils/errors"
export class AuthController {
  static async login (req: Request, res: Response) {
    try{
      const validation = await validateUserLogin(req.body)
      if(!validation.success) throw new ValidationError({errors: validation.error})
  
      const result = await AuthModel.login(req.body)
        
      res.json({data: result})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async refreshToken (req: Request, res: Response) {
    try{
      const refreshToken = req.headers.refresh as string

      if(!refreshToken) throw new ValidationError({message: "Algo ha ido mal"})

      const newAccessToken = await AuthModel.refreshToken(refreshToken)
       
      res.json({access_token: newAccessToken, message: "Token refreshed"})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async registrarConfirmando (req: Request, res: Response) {
    try{
      const validation = await validateInputConfirmando(req.body)
      if(!validation.success) throw new ValidationError({errors: validation.error})
  
      const result = await AuthModel.registrarConfirmando(req.body)

      res.json({data: result})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }

  static async registrarCatequista (req: Request, res: Response) {
    try{
      const validation = await validateCatequistaRegister(req.body)
      if(!validation.success) throw new ValidationError({errors: validation.error})
  
      const result = await AuthModel.registrarCatequista(req.body)

      res.json({data: result})
    }catch(e){
      GlobalErrorHandler(e, res)
    }
  }
}