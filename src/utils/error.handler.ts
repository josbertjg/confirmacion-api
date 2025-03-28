import { ZodError } from "zod"
import { Response } from "express"

export function ErrorInputsHandler(zodError: ZodError) {
  const details = zodError.issues.map((issue) => ({message: issue.message, path: issue.path}))
  return {
    error: "Validation Error",
    details: details
  }
}

export function ServerErrorHandler({error, res}: {error: any, res: Response}) {
  console.log(error)
  return res.status(500).json({error: "A server error ocurred, try again later"})
}