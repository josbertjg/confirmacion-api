import { ConfirmacionModel } from "../models/confirmacion";
import { ServerErrorHandler } from "../utils/errorHandler";
const confirmacionModel = new ConfirmacionModel();
export class ConfirmacionController {
    static async getAll(req, res) {
        try {
            const [confirmaciones] = await confirmacionModel.getAll();
            res.json({ data: confirmaciones });
        }
        catch (e) {
            ServerErrorHandler({ error: e, res });
        }
    }
}
