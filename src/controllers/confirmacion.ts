import { Request, Response } from "express"
import { ConfirmacionModel } from "../models/confirmacion"

export class ConfirmacionController {
  static async getAll(req: Request, res: Response) {
    const confirmaciones = await ConfirmacionModel.getAll()
    res.json({ data: confirmaciones })
  }
}