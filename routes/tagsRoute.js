import express from "express";
import { login, logout, me } from "../controllers/Auth.js";
import { createFiles } from "../controllers/Files.js";
import { createFormats } from "../controllers/Formats.js";
import { createTags } from "../controllers/Tags.js";

const tagsRouter = express.Router();

tagsRouter.post("/tags/:id", createTags);

export default tagsRouter;
