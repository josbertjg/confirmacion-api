var _a;
import express from "express";
// import { randomUUID } from "node:crypto"
import { corsMiddleware } from "./src/middlewares/cors";
import { authRouter } from "./src/routes/auth";
// import { catequesisRouter } from "./src/routes/catequesis";
// import { parroquiaRouter } from "./src/routes/parroquia";
// import { confirmacionRouter } from "./src/routes/confirmacion";
// import { confirmandoRouter } from "./src/routes/confirmando";
// import { catequistaRouter } from "./src/routes/catequista";
// import { userRouter } from "./src/routes/user";
const app = express();
app.disable("x-powered-by");
app.use(express.json());
app.use(corsMiddleware());
app.use("/auth", authRouter);
// app.use("/catequesis", catequesisRouter)
// app.use("/confirmacion", confirmacionRouter)
// app.use("/parroquia", parroquiaRouter)
// app.use("/confirmando", confirmandoRouter)
// app.use("/catequista", catequistaRouter)
// app.use("/user", userRouter)
const PORT = (_a = process.env.PROT) !== null && _a !== void 0 ? _a : 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
