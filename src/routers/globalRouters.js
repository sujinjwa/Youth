import express from "express";
import {
  home,
  about,
  youthkit,
  community,
} from "../controllers/contentControllers";
import {
  getJoin,
  sendMail,
  postJoin,
  getLogin,
  postLogin,
  logout,
  startKakaoLogin,
  finishKakaoLogin,
  startNaverLogin,
  finishNaverLogin,
} from "../controllers/userControllers";
import { protectorMiddleware, publicOnlyMiddleware } from "../middlewares";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/about", about);
globalRouter.get("/youthkit", youthkit);
globalRouter.get("/community", protectorMiddleware, community);
globalRouter
  .route("/join")
  .all(publicOnlyMiddleware)
  .get(getJoin)
  .post(postJoin);
globalRouter
  .route("/login")
  .all(publicOnlyMiddleware)
  .get(getLogin)
  .post(postLogin);
globalRouter.get("/login/kakao/start", publicOnlyMiddleware, startKakaoLogin);
globalRouter.get("/login/kakao/finish", publicOnlyMiddleware, finishKakaoLogin);
globalRouter.get("/login/naver/start", publicOnlyMiddleware, startNaverLogin);
globalRouter.get("/login/naver/finish", publicOnlyMiddleware, finishNaverLogin);
globalRouter.get("/logout", protectorMiddleware, logout);
// globalRouter.get("/login/findID", findID);
// globalRouter.get("/login/findPW", findPW);

export default globalRouter;
