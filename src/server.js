import express from "express";
import morgan from "morgan";
import session from "express-session";
import helmet from "helmet";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouters";
import contentRouter from "./routers/contentRouters";
import userRouter from "./routers/userRouters";
import { localsMiddleware } from "./middlewares";

const app = express();
const logger = morgan("dev");
app.use(logger);
app.use("/assets", express.static("assets")); // 정적 파일인 "assets" 폴더 서버에 로드
app.use("/uploads", express.static("uploads"));

if (process.env.NODE_ENV === "production") {
  app.use(
    helmet({
      contentSecurityPolicy: false,
      crossOriginResourcePolicy: false,
    })
  );
}

app.set("views", "./src/views");
app.set("view engine", "pug");

// session 미들웨어
app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      // maxAge: 10000,
    },
    store: MongoStore.create({ mongoUrl: process.env.DB_URL }), // session을 mongoDB에 저장
  })
);

app.use(localsMiddleware); // 전역 변수 선언 미들웨어
app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/contents", contentRouter);
export default app;
