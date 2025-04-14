import { Request, Response } from "express"
import { ConfirmandoModel } from "../models/confirmando"
import { AuthRequest } from "../schemas/middlewares"
import { validateAdminEditPartialConfirmando, validateEditPartialConfirmando } from "../schemas/confirmando"
import { ValidationError } from "../utils/errors"

export class ConfirmandoController {
  static async getAll(req: Request, res: Response) {
    const confirmando = await ConfirmandoModel.getAll()
    res.json({ data: confirmando })
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params
    const confirmando = await ConfirmandoModel.getById({ id })
    res.json({ data: confirmando })
  }

  static async edit(req: AuthRequest, res: Response) {
    const { id } = req.params
    const user = req.user!
    let validation = null

    if (user.role === "CONFIRMANDO" || user.role === "AUXILIAR") validation = await validateEditPartialConfirmando(req.body)
    else validation = await validateAdminEditPartialConfirmando(req.body)

    if (!validation.success) throw new ValidationError({ errors: validation.error })

    const response = await ConfirmandoModel.edit({ id, data: validation.data })
    res.json({ data: response })
  }

  static async inscribir(req: Request, res: Response) {
    const { id } = req.params
    const response = await ConfirmandoModel.inscribir({ id_confirmando: id })
    res.json({ data: response })
  }
}