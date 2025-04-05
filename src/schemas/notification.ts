import { z } from 'zod';
import { userSchema } from './user';

export const notificationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().max(255),
  description: z.string(),
});

export const notificationUserSchema = z.object({
  id: z.string().uuid(),
  notification_id: notificationSchema.shape.id,
  user_id: userSchema.shape.id,
});

export type Notification = z.infer<typeof notificationSchema>;
export type NotificationUser = z.infer<typeof notificationUserSchema>;