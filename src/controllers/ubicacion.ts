import { Request, Response } from "express"
import { UbicacionModel } from "../models/ubicacion"
import { validatePartialUbicacion, validateUbicacion } from "../schemas/ubicacion"
import { ValidationError } from "../utils/errors"

export class UbicacionController {
  static async getAll(req: Request, res: Response) {
    const ubicaciones = await UbicacionModel.getAll()
    res.json({ data: ubicaciones })
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params
    const ubicacion = await UbicacionModel.getById({ id: +id })
    res.json({ data: ubicacion })
  }

  static async create(req: Request, res: Response) {
    const result = await validateUbicacion(req.body)
    if (!result.success) throw new ValidationError({ errors: result.error })

    const response = await UbicacionModel.create({ ...result.data })
    res.status(201).json({ data: response })
  }

  static async edit(req: Request, res: Response) {
    const id = +req.params.id
    const result = await validatePartialUbicacion(req.body)
    if (!result.success) throw new ValidationError({ errors: result.error })

    const response = await UbicacionModel.edit({ data: result.data, id })
    res.json({ data: response })
  }

  static async delete(req: Request, res: Response) {
    const id = +req.params.id

    const response = await UbicacionModel.delete({ id })
    res.json({ data: response })
  }
}