import { Request, Response } from "express"
import { CatequesisModel } from "../models/catequesis"
import { GlobalErrorHandler } from "../utils/error.handler"

export class CatequesisController {
  static async getAll (_req: Request, res: Response) {
    try{
      await CatequesisModel.getAll()
      res.json({data: "catequesis /"})
    }catch(e) {
      GlobalErrorHandler(e, res)
    }
  }

  static async getById (req: Request, res: Response) {
    try{
      const {id} = req.params
      await CatequesisModel.getById({id})
      res.json({data:"Catequesis id", id})
    }catch(e) {
      GlobalErrorHandler(e, res)
    }
  }

  static async create (req: Request, res: Response) {
    try{
      await CatequesisModel.create(req.body)
      res.json({data:"Catequesis post", body: req.body})
    }catch(e) {
      GlobalErrorHandler(e, res)
    }
  }

  static async update (req: Request, res: Response) {
    try{
      const {id} = req.params
      await CatequesisModel.update(req.body)
      res.json({data:"Catequesis put", id})
    }catch(e) {
      GlobalErrorHandler(e, res)
    }
  }

  static async delete (req: Request, res: Response) {
    try{
      const {id} = req.params
      await CatequesisModel.delete(id)
      res.json({data:"Catequesis delete", id})
    }catch(e) {
      GlobalErrorHandler(e, res)
    }
  }
}