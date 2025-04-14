import { Request, Response } from "express"
import { ParroquiaModel } from "../models/parroquia"

export class ParroquiaController {
  static async getAll(req: Request, res: Response) {
    const parroquias = await ParroquiaModel.getAll()
    res.json({ data: parroquias })
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params
    const parroquia = await ParroquiaModel.getById({ id: +id })
    res.json({ data: parroquia })
  }
}