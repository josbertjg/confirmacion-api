import { ZodError } from "zod"
import { Errors } from "../schemas/error"

interface ErrorProps {
  message?: string,
  errors?: ZodError
}

const createErrorFactory = function (name: Errors) {
  return class CustomError extends Error {
    public errors!: ZodError
    constructor({message, errors}:ErrorProps) {
      super(message)
      this.name = name
      this.errors = errors!
    }
  }
}

export const ServerError = createErrorFactory('ServerError')
export const ValidationError = createErrorFactory('ValidationError')
export const AuthError = createErrorFactory('AuthError')
export const NotFoundError = createErrorFactory('NotFoundError')
export const ConnectionError = createErrorFactory('ConnectionError')