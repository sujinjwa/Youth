import express from "express";
import { getEdit, postEdit, deleteUser } from "../controllers/userControllers";

const userRouter = express.Router();

// userRouter.get("/:id([0-9a-f]{24})", seeUser);
userRouter.route("/edit").get(getEdit).post(postEdit);
userRouter.get("/delete", deleteUser);

export default userRouter;
