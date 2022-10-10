import express from "express";
import {
  getEditUser,
  postEditUser,
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
  .get(getEditUser)
  .post(upload.single("avatar"), postEditUser);
userRouter
  .route("/editPW")
  .all(protectorMiddleware)
  .get(getEditPW)
  .post(postEditPW);
userRouter.get("/beforeDelete", protectorMiddleware, beforeDeleteUser);
userRouter.get("/delete", protectorMiddleware, deleteUser);

export default userRouter;
