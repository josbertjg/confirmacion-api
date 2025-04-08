import { Connection } from "../config/connection"
import { GrupoVida } from "../schemas/grupoVida";
import { AuthRequest } from "../schemas/middlewares";
import { PublicUser, returnPublicUsers, User } from "../schemas/user";
import { returnUserMe, UserMe } from "../schemas/userMe";
import { CatequistaModel } from "./catequista";
import { ConfirmacionModel } from "./confirmacion";
import { ConfirmandoModel } from "./confirmando";
import { GrupoVidaModel } from "./grupoVida";
import { NotificationModel } from "./notification";
import { ParroquiaModel } from "./parroquia";
import { UbicacionModel } from "./ubicacion";

export class UserModel {
  static async getAll () {
    const users = await Connection.query<User[]>(`SELECT *, BIN_TO_UUID(id) as id FROM users;`)
    const formattedUsers = returnPublicUsers(users)
    return formattedUsers
  }

  static async getById ({id}: {id: string}): Promise<PublicUser> {
    const [user] = await Connection.query<User[]>(`SELECT *, BIN_TO_UUID(id) as id FROM users WHERE id = UUID_TO_BIN(?);`, [id])
    const formattedUser = returnPublicUsers(user) as User

    return formattedUser;
  }

  static async me (user: Pick<NonNullable<AuthRequest['user']>, 'id' | 'role'>) {

    const userInfo = await UserModel.getById({id: user.id})
    const parroquia = await ParroquiaModel.getById({id: userInfo.id_parroquia})
    const notifications = await NotificationModel.getAll({id: userInfo.id})
    let catequista_info = null;
    let confirmando_info = null;
    let confirmacion = null;
    let grupos_vida: GrupoVida[] = [];
    let ubicacion = null;
    
    if(!!userInfo.id_ubicacion) ubicacion = await UbicacionModel.getById({id: userInfo.id_ubicacion})

    if(userInfo.role === 'CATEQUISTA' || userInfo.role === 'AUXILIAR') {
      catequista_info = await CatequistaModel.getByUserId({id: userInfo.id})
      grupos_vida = await GrupoVidaModel.getByCatequistaId({id: catequista_info.id})
    }
    
    if(userInfo.role === 'CONFIRMANDO') {
      confirmando_info = await ConfirmandoModel.getByUserId({id: userInfo.id})
      confirmacion = await ConfirmacionModel.getByConfirmandoId({id: confirmando_info.id_confirmacion})
      if(!!confirmando_info.grupoVida_id) grupos_vida = [await GrupoVidaModel.getById({id: confirmando_info.grupoVida_id})]
    }


    const userMe: UserMe = {
      ...userInfo,
      parroquia,
      catequista_info,
      confirmando_info,
      confirmacion,
      grupos_vida,
      ubicacion,
      notifications,
    };

    return returnUserMe(userMe);
  }

}