import express from "express";
import { login, logout, me } from "../controllers/Auth.js";

const authRouter = express.Router();

authRouter.get("/me", me);
authRouter.post("/login", login);
authRouter.delete("/logout", logout);

export default authRouter;
