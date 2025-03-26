import express from "express";
// import { randomUUID } from "node:crypto"
import { corsMiddleware } from "./src/middlewares/cors.js";
import { catequesisRouter } from "./src/routes/catequesis.js";
import { authRouter } from "./src/routes/auth.js";
import { parroquiaRouter } from "./src/routes/parroquia.js";
import { confirmacionRouter } from "./src/routes/confirmacion.js";
import { confirmandoRouter } from "./src/routes/confirmando.js";
import { catequistaRouter } from "./src/routes/catequista.js";
import { userRouter } from "./src/routes/user.js";

const app = express();

app.disable("x-powered-by")

app.use(express.json())
app.use(corsMiddleware())

app.use("/catequesis", catequesisRouter)
app.use("/auth", authRouter)
app.use("/confirmacion", confirmacionRouter)
app.use("/parroquia", parroquiaRouter)
app.use("/confirmando", confirmandoRouter)
app.use("/catequista", catequistaRouter)
app.use("/user", userRouter)
 
const PORT = process.env.PROT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
