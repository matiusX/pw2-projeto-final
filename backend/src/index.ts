import express from "express";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import { v4 as uuidv4 } from "uuid";
import session from "express-session";
import cors from "cors";

import validadeEnv  from "./utils/validadeEnv";
import setCookieLang from "./middlewares/setCookieLanguage";
import swaggerUi from "swagger-ui-express";
import swaggerFile from "./swagger-output.json";
import router from "./router";

declare module 'express-session' {
    interface SessionData {
      uid: string;
      tipoUsuarioId: string;
    }
  }

dotenv.config();
validadeEnv();

const PORT = process.env.PORT ?? 4455;
const app = express();

app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(cookieParser());
app.use(setCookieLang);
app.use(session({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    genid: (req) => uuidv4(),
    secret: "ida",
    resave: true,
    saveUninitialized: true,
}))
app.use("/api", swaggerUi.serve, swaggerUi.setup(swaggerFile));
app.use(router);

app.use("/img", express.static(`${__dirname}/../public/img.jpg`))


app.listen(PORT, ()=> {
    console.log(`SERVIDOR EM ${PORT}`);
})