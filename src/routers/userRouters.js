import express from "express";
import { seeUser, editUser, deleteUser } from "../controllers/userControllers";

const userRouter = express.Router();

userRouter.get("/:id(\\d+)", seeUser);
userRouter.get("/edit", editUser);
userRouter.get("/delete", deleteUser);

export default userRouter;
