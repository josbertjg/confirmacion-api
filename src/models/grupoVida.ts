import { Connection } from "../config/connection"
import { CatequistaGruposVida } from "../schemas/catequista";
import { GrupoVida } from "../schemas/grupoVida";

export class GrupoVidaModel {
  static async getAll (): Promise<GrupoVida[]> {
    const grupos_vida = await Connection.query<GrupoVida[]>(`SELECT *, BIN_TO_UUID(id) as id FROM grupos_vida;`)
    return grupos_vida
  }

  static async getById ({id}: {id: string}): Promise<GrupoVida> {
    const [grupo_vida] = await Connection.query<GrupoVida[]>(`SELECT *, BIN_TO_UUID(id) as id FROM grupos_vida WHERE id = UUID_TO_BIN(?);`, [id])
    return grupo_vida;
  }

  static async getByCatequistaId ({id}: {id: string}): Promise<GrupoVida[]> {
    const catequistasGruposVida = await Connection.query<CatequistaGruposVida[]>(`SELECT *, BIN_TO_UUID(id) as id, BIN_TO_UUID(id_grupo_vida) as id_grupo_vida FROM catequistas_grupos_vida WHERE id_catequista = UUID_TO_BIN(?);`, [id])
    if(catequistasGruposVida.length === 0) return []

    let gruposVidaArr: GrupoVida[] = [];
    catequistasGruposVida.map(async (catGrupoVida) => {
      const grupoVida = await GrupoVidaModel.getById({id: catGrupoVida.id_grupo_vida})
      gruposVidaArr.push(grupoVida)
    })

    return gruposVidaArr;
  }
}