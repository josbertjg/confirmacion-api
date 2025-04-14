import { NextFunction, Response } from "express";
import { verifyAccessToken } from "../utils/token";
import { AuthError } from "../utils/errors";
import { Role } from "../schemas/user";
import { AuthRequest } from "../schemas/middlewares";

export const AuthMiddleware = (role: Role[] = []) => async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(' ').pop()
  if (!token) throw new AuthError({ message: 'Necesitas estar logueado para acceder a esta ruta' })

  const jwtData = verifyAccessToken(token)

  if (!jwtData) throw new AuthError({ message: 'Necesitas estar logueado para acceder a esta ruta' })

  if (role.length === 0 || role.includes(jwtData.role) || jwtData.role === "ADMIN") {
    req.user = { id: jwtData.id, role: jwtData.role }
    next()
  }
  else throw new AuthError({ message: 'No tienes permiso para acceder a esta ruta' })
}