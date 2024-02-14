import express from "express";
import { login, logout, me } from "../controllers/Auth.js";
import { createFiles } from "../controllers/Files.js";
import { createColors } from "../controllers/Colors.js";
import { createFavorites } from "../controllers/Favorite.js";

const favorieRouter = express.Router();

favorieRouter.post("/favorites/", createFavorites);

export default favorieRouter;
