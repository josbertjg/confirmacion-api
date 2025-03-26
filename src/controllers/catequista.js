import { CatequistaModel } from "../models/catequista.js"
import { ServerErrorHandler } from "../utils/errorHandler.js"

const catequistaModel = new CatequistaModel()

export class CatequistaController {
  static async getAll (req, res) {
    try{
      const [catequistas] = await catequistaModel.getAll()
      res.json({data: catequistas})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
  static async getById (req, res) {
    try{
      const {id} = req.params
      const catequista = await catequistaModel.getById({id})
      res.json({data: catequista})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
  static async activate (req, res) {
    try{
      const {id} = req.params
      const result = await catequistaModel.activate({id})
      if(!!result.error) return res.status(400).json({error: result.error})
      res.json({data: result})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
}