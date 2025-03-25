import { ConfirmandoModel } from "../models/confirmando.js"

const confirmandoModel = new ConfirmandoModel()

export class ConfirmandoController {
  static async getAll (req, res) {
    try{
      const [confirmando] = await confirmandoModel.getAll()
      res.json({data: confirmando})
    }catch(e){
      res.status(500).json({error: "A server error ocurred, try again later"})
      console.log(e)
    }
  }

  static async getById (req, res) {
    try{
      const {id} = req.params
      const confirmando = await confirmandoModel.getById({id})
      res.json({data: confirmando})
    }catch(e){
      res.status(500).json({error: "A server error ocurred, try again later"})
      console.log(e)
    }
  }

  static async inscribir (req, res) {
    try{
      const {id} = req.params
      const confirmando = await confirmandoModel.inscribir({id})
      res.json({data: confirmando})
    }catch(e){
      res.status(500).json({error: "A server error ocurred, try again later"})
      console.log(e)
    }
  }
}