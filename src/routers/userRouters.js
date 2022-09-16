import express from "express";
import { seeUser, editUser, deleteUser } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/:id([0-9a-f]{24})", seeUser);
userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);

export default userRouter;
