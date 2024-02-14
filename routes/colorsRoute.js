import express from "express";
import { login, logout, me } from "../controllers/Auth.js";
import { createFiles } from "../controllers/Files.js";
import { createColors } from "../controllers/Colors.js";

const colorRouter = express.Router();

colorRouter.post("/colors/:id", createColors);

export default colorRouter;
