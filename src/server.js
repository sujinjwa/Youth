import express from "express";
import morgan from "morgan";
import session from "express-session";
// import helmet from "helmet";
import cors from "cors";
import MongoStore from "connect-mongo";
import globalRouter from "./routers/globalRouters";
import contentRouter from "./routers/contentRouters";
import userRouter from "./routers/userRouters";
import policyRouter from "./routers/policyRouters";
import { localsMiddleware } from "./middlewares";

const app = express();
// if (process.env.NODE_ENV === "production") {
//   app.use(
//     helmet({
//       contentSecurityPolicy: false,
//     })
//   );
// }

const corsOptions = {
  origin:
    "https://writeyouth.s3.ap-northeast-2.amazonaws.com/b47570143d8d8c1ca467298a5d0a691b",
  crendentials: true,
  optionsSuccessStatus: 200,
};
app.use(cors(corsOptions));

const logger = morgan("dev");
app.use(logger);
app.use("/assets", express.static("assets")); // 정적 파일인 "assets" 폴더 서버에 로드
app.use("/uploads", express.static("uploads"));

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
app.use("/policy", policyRouter);
export default app;
