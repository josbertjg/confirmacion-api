import { Request } from "express"
import { User } from "./user"

export interface AuthRequest extends Request {
  user?: {
    id: User['id'],
    role: User['role']
  }
}