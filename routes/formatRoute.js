import express from "express";
import { login, logout, me } from "../controllers/Auth.js";
import { createFiles } from "../controllers/Files.js";
import { createFormats } from "../controllers/Formats.js";

const formatRouter = express.Router();

formatRouter.post("/formats/:id", createFormats);

export default formatRouter;
