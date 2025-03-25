import express from "express";
// import { randomUUID } from "node:crypto"
import { corsMiddleware } from "./src/middlewares/cors.js";
import { catequesisRouter } from "./src/routes/catequesis.js";
import { authRouter } from "./src/routes/auth.js";
import { parroquiaRouter } from "./src/routes/parroquia.js";
import { confirmacionRouter } from "./src/routes/confirmacion.js";

const app = express();

app.disable("x-powered-by")

app.use(express.json())
app.use(corsMiddleware())

app.use("/catequesis", catequesisRouter)
app.use("/auth", authRouter)
app.use("/confirmacion", confirmacionRouter)
app.use("/parroquia", parroquiaRouter)
 
const PORT = process.env.PROT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})
