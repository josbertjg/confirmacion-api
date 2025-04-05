import { Connection } from "../config/connection"
import { Notification, NotificationUser } from "../schemas/notification";

export class NotificationModel {
  static async getAll ({id}: {id: string}): Promise<Notification[]> {
    const notificationsUsers = await Connection.query<NotificationUser[]>(`SELECT *, 
      BIN_TO_UUID(id) as id, 
      BIN_TO_UUID(notification_id) as notification_id, 
      BIN_TO_UUID(user_id) as user_id FROM notifications_users WHERE user_id = UUID_TO_BIN(?);`, [id])
    if(notificationsUsers.length === 0) return []

    let notificationsArr: Notification[] = [];

    notificationsUsers.map(async (notifUser) => {
      const notification = await NotificationModel.getById({id: notifUser.notification_id})
      notificationsArr.push(notification)
    })

    return notificationsArr;
  }

  static async getById ({id}: {id: string}): Promise<Notification> {
    const [notification] = await Connection.query<Notification[]>(`SELECT *, BIN_TO_UUID(id) as id FROM notifications WHERE id = UUID_TO_BIN(?);`, [id])
    return notification;
  }
  
}