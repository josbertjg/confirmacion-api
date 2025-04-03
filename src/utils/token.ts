import { JwtPayload, sign, verify } from "jsonwebtoken"
import { Role, User } from "../schemas/user"
import { SECRET_JWT_KEY } from "../config/config";

interface TokenPayload {
  id: Pick<User, "id">;
  role: Role
}

interface DecodedToken extends JwtPayload, TokenPayload {}

export const generateToken = (payload: TokenPayload) => {
  return sign({...payload}, SECRET_JWT_KEY, {expiresIn: "1h"})
}

export const verifyToken = (token: string): DecodedToken => {
  return verify(token, SECRET_JWT_KEY) as DecodedToken
}