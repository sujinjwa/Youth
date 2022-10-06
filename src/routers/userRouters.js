import express from "express";
import {
  getEdit,
  postEdit,
  getEditPW,
  postEditPW,
  deleteUser,
} from "../controllers/userControllers";
import { protectorMiddleware, upload, beforeDeleteUser } from "../middlewares";

const userRouter = express.Router();

// userRouter.get("/:id([0-9a-f]{24})", seeUser);
userRouter
  .route("/edit")
  .all(protectorMiddleware)
  .get(getEdit)
  .post(upload.single("avatar"), postEdit);
userRouter
  .route("/editPW")
  .all(protectorMiddleware)
  .get(getEditPW)
  .post(postEditPW);
userRouter.get("/beforeDelete", protectorMiddleware, beforeDeleteUser);
userRouter.get("/delete", protectorMiddleware, deleteUser);

export default userRouter;
