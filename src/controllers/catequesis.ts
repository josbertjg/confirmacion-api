import { Request, Response } from "express"
import { CatequesisModel } from "../models/catequesis"

export class CatequesisController {
  static async getAll(_req: Request, res: Response) {
    await CatequesisModel.getAll()
    res.json({ data: "catequesis /" })
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params
    await CatequesisModel.getById({ id })
    res.json({ data: "Catequesis id", id })
  }

  static async create(req: Request, res: Response) {
    await CatequesisModel.create(req.body)
    res.json({ data: "Catequesis post", body: req.body })
  }

  static async update(req: Request, res: Response) {
    const { id } = req.params
    await CatequesisModel.update(req.body)
    res.json({ data: "Catequesis put", id })
  }

  static async delete(req: Request, res: Response) {
    const { id } = req.params
    await CatequesisModel.delete(id)
    res.json({ data: "Catequesis delete", id })
  }
}