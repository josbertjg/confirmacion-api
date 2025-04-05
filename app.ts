import express, { Application } from "express";
import { corsMiddleware } from "./src/middlewares/cors";
import { authRouter } from "./src/routes/auth";
import { catequesisRouter } from "./src/routes/catequesis";
import { parroquiaRouter } from "./src/routes/parroquia";
import { confirmacionRouter } from "./src/routes/confirmacion";
import { confirmandoRouter } from "./src/routes/confirmando";
import { catequistaRouter } from "./src/routes/catequista";
import { userRouter } from "./src/routes/user";
import { ErrorsCatcherMiddleware } from "./src/middlewares/errors.catcher";
import { API_PORT } from "./src/config/config";
import { notificationRouter } from "./src/routes/notification";
import { ubicacionRouter } from "./src/routes/ubicacion";
import { grupoVidaRouter } from "./src/routes/grupoVida";

const app:Application = express();

app.disable("x-powered-by")

app.use(express.json())

app.use(ErrorsCatcherMiddleware)
app.use(corsMiddleware())

app.use("/auth", authRouter)
app.use("/catequesis", catequesisRouter)
app.use("/parroquia", parroquiaRouter)
app.use("/confirmacion", confirmacionRouter)
app.use("/confirmando", confirmandoRouter)
app.use("/catequista", catequistaRouter)
app.use("/user", userRouter)
app.use("/grupo-vida", grupoVidaRouter)
app.use("/notification", notificationRouter)
app.use("/ubicacion", ubicacionRouter)
 
app.listen(API_PORT, () => {
  console.log(`Server running on port ${API_PORT}`);
})
