import express from "express";
import { login, logout, me } from "../controllers/Auth.js";
import { createFiles } from "../controllers/Files.js";

const fileRouter = express.Router();

fileRouter.post("/files/:id", createFiles);

export default fileRouter;
