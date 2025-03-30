import { Response } from "express"
import { ServerError, ValidationError, AuthError, NotFoundError, ConnectionError } from "./errors"

export const GlobalErrorHandler = (
  e: typeof ValidationError | 
     typeof AuthError | 
     typeof NotFoundError | 
     typeof ServerError | 
     typeof ConnectionError | any, 
  res: Response) => {

  console.log(e)

  if(e instanceof ValidationError) {
    if(!e.errors && !e.message) return res.status(400).json({error: "Validation Error"})

    if(!e.errors) return res.status(400).json({error: e.message})

    const details = e.errors.issues.map((issue) => ({message: issue.message, path: issue.path}))
    return res.status(400).json({error: "Validation Error", details})
  }

  if(e instanceof ConnectionError) return res.status(500).json({error: e.message})

  if(e instanceof AuthError) return res.status(401).json({error: e.message})

  if(e instanceof NotFoundError) return res.status(404).json({error: e.message})
  
  return res.status(500).json({error: "Internal Server Error"})
}