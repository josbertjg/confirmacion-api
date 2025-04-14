import { Request, Response } from "express"
import { CatequistaModel } from "../models/catequista"

export class CatequistaController {
  static async getAll(req: Request, res: Response) {
    const catequistas = await CatequistaModel.getAll()
    res.json({ data: catequistas })

  }
  static async getById(req: Request, res: Response) {
    const { id } = req.params
    const catequista = await CatequistaModel.getById({ id })
    res.json({ data: catequista })
  }
  static async activate(req: Request, res: Response) {
    const { id } = req.params
    const result = await CatequistaModel.activate({ user_id: id })
    res.json({ data: result })
  }
}