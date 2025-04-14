import { Request, Response } from "express"
import { UserModel } from "../models/user"
import { AuthRequest } from "../schemas/middlewares"

export class UserController {
  static async getAll(req: Request, res: Response) {
    const catequistas = await UserModel.getAll()
    res.json({ data: catequistas })
  }

  static async getById(req: Request, res: Response) {
    const { id } = req.params
    const catequista = await UserModel.getById({ id })
    res.json({ data: catequista })
  }

  static async me(req: AuthRequest, res: Response) {
    const userMe = await UserModel.me(req.user!)
    res.json({ data: userMe })
  }
}