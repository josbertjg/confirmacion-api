import { NextFunction, Request, Response } from "express";
import { Connection } from "../config/connection";
import { GlobalErrorHandler } from "../utils/error.handler";
import { ConnectionError } from "../utils/errors";

export const ErrorsCatcherMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  try{
    const isConnected = await Connection.testConnection();
    if(!isConnected){
      console.log("Respuesta recibida sin conexion a la base de datos")
      throw new ConnectionError({message: "Error de conexion en el servidor, por favor intentalo mas tarde"})
    }else{
      next();
    }
  }catch(e){
    GlobalErrorHandler(e, res)
  }
}