import { CatequesisModel } from "../models/catequesis";
const catequesisModel = new CatequesisModel();
export class CatequesisController {
    static async getAll(_req, res) {
        await catequesisModel.getAll();
        res.json({ data: "catequesis /" });
    }
    static async getById(req, res) {
        const { id } = req.params;
        await catequesisModel.getById({ id });
        res.json({ data: "Catequesis id", id });
    }
    static async create(req, res) {
        await catequesisModel.create(req.body);
        res.json({ data: "Catequesis post", body: req.body });
    }
    static async update(req, res) {
        const { id } = req.params;
        await catequesisModel.update(req.body);
        res.json({ data: "Catequesis put", id });
    }
    static async delete(req, res) {
        const { id } = req.params;
        await catequesisModel.delete(id);
        res.json({ data: "Catequesis delete", id });
    }
}
