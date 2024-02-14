import express from "express";
import { login, logout, me } from "../controllers/Auth.js";
import { createFiles } from "../controllers/Files.js";
import { createColors } from "../controllers/Colors.js";
import { createFavorites } from "../controllers/Favorite.js";
import { createFollows } from "../controllers/Follows.js";

const followRouter = express.Router();

followRouter.post("/follows/", createFollows);

export default followRouter;
