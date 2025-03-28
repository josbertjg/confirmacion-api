import { ConfirmandoModel } from "../models/confirmando";
import { ServerErrorHandler } from "../utils/errorHandler";
const confirmandoModel = new ConfirmandoModel();
export class ConfirmandoController {
    static async getAll(req, res) {
        try {
            const [confirmando] = await confirmandoModel.getAll();
            res.json({ data: confirmando });
        }
        catch (e) {
            ServerErrorHandler({ error: e, res });
        }
    }
    static async getById(req, res) {
        try {
            const { id } = req.params;
            const confirmando = await confirmandoModel.getById({ id });
            res.json({ data: confirmando });
        }
        catch (e) {
            ServerErrorHandler({ error: e, res });
        }
    }
    static async inscribir(req, res) {
        try {
            const { id } = req.params;
            const response = await confirmandoModel.inscribir({ id });
            if (!!response.error)
                return res.status(400).json({ error: response.error });
            else
                return res.json({ data: response });
        }
        catch (e) {
            ServerErrorHandler({ error: e, res });
        }
    }
}
