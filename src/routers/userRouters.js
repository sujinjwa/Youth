import express from "express";
import {
  getEdit,
  postEdit,
  getEditPW,
  postEditPW,
  deleteUser,
} from "../controllers/userControllers";
import { protectorMiddleware } from "../middlewares";

const userRouter = express.Router();

// userRouter.get("/:id([0-9a-f]{24})", seeUser);
userRouter.route("/edit").all(protectorMiddleware).get(getEdit).post(postEdit);
userRouter
  .route("/editPW")
  .all(protectorMiddleware)
  .get(getEditPW)
  .post(postEditPW);
userRouter.get("/delete", protectorMiddleware, deleteUser);

export default userRouter;
