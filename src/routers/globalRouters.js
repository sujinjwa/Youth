import express from "express";
import {
  home,
  about,
  youthkit,
  community,
} from "../controllers/contentControllers";
import {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  startKakaoLogin,
  finishKakaoLogin,
  startNaverLogin,
  finishNaverLogin,
} from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/about", about);
globalRouter.get("/youthkit", youthkit);
globalRouter.get("/community", community);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/login/kakao/start", startKakaoLogin);
globalRouter.get("/login/kakao/finish", finishKakaoLogin);
globalRouter.get("/login/naver/start", startNaverLogin);
globalRouter.get("/login/naver/finish", finishNaverLogin);
globalRouter.get("/logout", logout);
// globalRouter.get("/login/findID", findID);
// globalRouter.get("/login/findPW", findPW);

export default globalRouter;
