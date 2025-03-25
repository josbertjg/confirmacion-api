import { ParroquiaModel } from "../models/parroquia.js"


const parroquiaModel = new ParroquiaModel()

export class ParroquiaController {
  static async getAll (req, res) {
    try{
      const [parroquias] = await parroquiaModel.getAll()
      res.json({data: parroquias})
    }catch(e){
      res.status(500).json({error: "A server error ocurred, try again later"})
      console.log(e)
    }
  }

  static async getById (req, res) {
    try{
      const {id} = req.params
      const parroquia = await parroquiaModel.getById({id})
      res.json({data: parroquia})
    }catch(e){
      res.status(500).json({error: "A server error ocurred, try again later"})
      console.log(e)
    }
  }
}