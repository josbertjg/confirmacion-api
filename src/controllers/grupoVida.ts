import { Request, Response } from "express"
import { GrupoVidaModel } from "../models/grupoVida"

export class GrupoVidaController {
  static async getAll(req: Request, res: Response) {
    const grupos_vida = await GrupoVidaModel.getAll()
    res.json({ data: grupos_vida })
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params
    const grupo_vida = await GrupoVidaModel.getById({ id: id })
    res.json({ data: grupo_vida })
  }
}