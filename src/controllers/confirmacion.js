import { ConfirmacionModel } from "../models/confirmacion.js"

const confirmacionModel = new ConfirmacionModel()

export class ConfirmacionController {
  static async getAll (req, res) {
    try{
      const [confirmaciones] = await confirmacionModel.getAll()
      res.json({data: confirmaciones})
    }catch(e){
      res.status(500).json({error: "A server error ocurred, try again later"})
    }
  }
}