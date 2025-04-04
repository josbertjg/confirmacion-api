import { NextFunction, Request, Response } from "express";
import { GlobalErrorHandler } from "../utils/error.handler";
import { verifyAccessToken } from "../utils/token";
import { AuthError } from "../utils/errors";
import { Role } from "../schemas/user";

export const AuthMiddleware = (role: Role[] = []) => async (req: Request, res: Response, next: NextFunction) => {
  try{
    const token = req.headers.authorization?.split(' ').pop()
    if(!token) throw new AuthError({message: 'Necesitas estar logueado para acceder a esta ruta'})

    const jwtData = verifyAccessToken(token)

    if(jwtData.role.length === 0 || role.includes(jwtData.role) || jwtData.role === "ADMIN") next()
    else throw new AuthError({message: 'No tienes permiso para acceder a esta ruta'})
  }catch(e){
    GlobalErrorHandler(e, res)
  }
}