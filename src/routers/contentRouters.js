import express from "express";
import { qna, detail, recommend } from "../controllers/contentControllers";

const contentRouter = express.Router();

contentRouter.get("/qna/:id(\\d+)", qna);
contentRouter.get("/detail", detail);
contentRouter.get("/recommend", recommend);

export default contentRouter;
