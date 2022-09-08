import express from "express";
import { home, about, youthkit } from "../controllers/contentControllers";
import { join, login } from "../controllers/userControllers";

const globalRouter = express.Router();

globalRouter.get("/", home);
globalRouter.get("/about", about);
globalRouter.get("/youthkit", youthkit);
globalRouter.get("/join", join);
globalRouter.get("/login", login);

export default globalRouter;
