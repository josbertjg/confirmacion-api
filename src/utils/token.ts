import { JwtPayload, sign, verify } from "jsonwebtoken"
import { Role, User } from "../schemas/user"
import { SECRET_JWT_KEY, SECRET_JWT_REFRESH_KEY } from "../config/config";

interface TokenPayload extends Pick<User, "id"> {
  role: Role
}

interface DecodedToken extends JwtPayload, TokenPayload {}

export const generateAccessToken = (payload: TokenPayload) => {
  return sign({...payload}, SECRET_JWT_KEY, {expiresIn: "1h"})
}

export const generateRefreshToken = (payload: TokenPayload) => {
  return sign({...payload}, SECRET_JWT_REFRESH_KEY, {expiresIn: "15d"})
}

export const verifyAccessToken = (token: string): DecodedToken => {
  return verify(token, SECRET_JWT_KEY) as DecodedToken
}

export const verifyRefreshToken = (token: string): DecodedToken => {
  return verify(token, SECRET_JWT_REFRESH_KEY) as DecodedToken
}
