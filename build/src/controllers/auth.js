import { AuthModel } from "../models/auth";
import { validateInputConfirmando } from "../schemas/confirmando";
import { validateUserLogin } from "../schemas/login";
import { validateCatequistaRegister } from "../schemas/catequista";
import { ErrorInputsHandler, ServerErrorHandler } from "../utils/errorHandler";
const authModel = new AuthModel();
export class AuthController {
    static async login(req, res) {
        try {
            const validation = await validateUserLogin(req.body);
            if (!validation.success)
                res.status(400).json(ErrorInputsHandler(validation.error));
            const result = await authModel.login(req.body);
            if (!!result.error)
                res.status(400).json({ error: result.error });
            res.json({ data: result });
        }
        catch (e) {
            ServerErrorHandler({ error: e, res });
        }
    }
    static async registrarConfirmando(req, res) {
        try {
            const validation = await validateInputConfirmando(req.body);
            if (!validation.success)
                res.status(400).json(ErrorInputsHandler(validation.error));
            const result = await authModel.registrarConfirmando(req.body);
            if (!!result.error)
                res.status(400).json({ error: result.error });
            res.json({ data: result });
        }
        catch (e) {
            ServerErrorHandler({ error: e, res });
        }
    }
    static async registrarCatequista(req, res) {
        try {
            const validation = await validateCatequistaRegister(req.body);
            if (!validation.success)
                res.status(400).json(ErrorInputsHandler(validation.error));
            const result = await authModel.registrarCatequista(req.body);
            if (!!result.error)
                res.status(400).json({ error: result.error });
            res.json({ data: result });
        }
        catch (e) {
            ServerErrorHandler({ error: e, res });
        }
    }
}
