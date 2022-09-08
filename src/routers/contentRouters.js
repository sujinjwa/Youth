import express from "express";
import { why, qna, recommend } from "../controllers/contentControllers";

const contentRouter = express.Router();

contentRouter.get("/why", why);
contentRouter.get("/qna/:id", qna);
contentRouter.get("/recommend", recommend);

export default contentRouter;
