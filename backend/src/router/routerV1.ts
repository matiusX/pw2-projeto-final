import { Router } from "express";
import produtoRouter from "../resources/produto/produto.router"; 
import exercicioRouter from "../resources/exercicio/router.exercicio";
import languageRouter from "../resources/language/language.router";
import usuarioRouter from "../resources/usuario/usuario.router";
import authRouter from "../resources/auth/auth.router";

const router = Router();

router.use("/produto", produtoRouter);
router.use("/language", languageRouter);
router.use("/usuario", usuarioRouter);
router.use("/exercicio", exercicioRouter);
router.use("/", authRouter);



export default router;