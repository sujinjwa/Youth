import express from "express";
import { policy } from "../controllers/policyController";

const serviceRouter = express.Router();

serviceRouter.get("/", policy);

export default serviceRouter;
