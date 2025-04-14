import { AuthModel } from "../models/auth"
import { validateInputConfirmando } from "../schemas/confirmando"
import { validateUserLogin } from "../schemas/login"
import { validateCatequistaRegister } from "../schemas/catequista"
import { Request, Response } from "express"
import { ValidationError } from "../utils/errors"
export class AuthController {
  static async login(req: Request, res: Response) {
    const validation = await validateUserLogin(req.body)
    if (!validation.success) throw new ValidationError({ errors: validation.error })

    const result = await AuthModel.login(req.body)

    res.json({ data: result })
  }

  static async refreshToken(req: Request, res: Response) {
    const refreshToken = req.headers.refresh as string

    if (!refreshToken) throw new ValidationError({ message: "Algo ha ido mal" })

    const newAccessToken = await AuthModel.refreshToken(refreshToken)

    res.json({ access_token: newAccessToken, message: "Token refreshed" })
  }

  static async registrarConfirmando(req: Request, res: Response) {
    const validation = await validateInputConfirmando(req.body)
    if (!validation.success) throw new ValidationError({ errors: validation.error })

    const result = await AuthModel.registrarConfirmando(req.body)

    res.json({ data: result })
  }

  static async registrarCatequista(req: Request, res: Response) {
    const validation = await validateCatequistaRegister(req.body)
    if (!validation.success) throw new ValidationError({ errors: validation.error })

    const result = await AuthModel.registrarCatequista(req.body)

    res.json({ data: result })
  }
}