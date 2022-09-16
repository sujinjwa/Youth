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
} from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/about", about);
globalRouter.get("/youthkit", youthkit);
globalRouter.get("/community", community);
globalRouter.route("/join").get(getJoin).post(postJoin);
globalRouter.route("/login").get(getLogin).post(postLogin);
globalRouter.get("/logout", logout);
// globalRouter.get("/login/findID", findID);
// globalRouter.get("/login/findPW", findPW);

export default globalRouter;
