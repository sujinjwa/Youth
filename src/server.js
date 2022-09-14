import express from "express";
import morgan from "morgan";
import globalRouter from "./routers/globalRouters";
import contentRouter from "./routers/contentRouters";
import userRouter from "./routers/userRouters";

const app = express();
const logger = morgan("dev");
app.use(logger);
app.use("/assets", express.static("assets")); // 정적 파일인 "assets" 폴더 서버에 로드
app.use("/uploads", express.static("uploads"));

app.set("views", "./src/views");
app.set("view engine", "pug");

app.use(express.urlencoded({ extended: true }));
app.use("/", globalRouter);
app.use("/users", userRouter);
app.use("/contents", contentRouter);

export default app;
