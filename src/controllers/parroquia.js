import { ParroquiaModel } from "../models/parroquia.js"
import { ServerErrorHandler } from "../utils/errorHandler.js"


const parroquiaModel = new ParroquiaModel()

export class ParroquiaController {
  static async getAll (req, res) {
    try{
      const [parroquias] = await parroquiaModel.getAll()
      res.json({data: parroquias})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }

  static async getById (req, res) {
    try{
      const {id} = req.params
      const parroquia = await parroquiaModel.getById({id})
      res.json({data: parroquia})
    }catch(e){
      ServerErrorHandler({error: e, res})
    }
  }
}