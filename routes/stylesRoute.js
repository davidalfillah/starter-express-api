import express from "express";
import { createStyles } from "../controllers/Styles.js";

const stylesRouter = express.Router();

stylesRouter.post("/styles/:id", createStyles);

export default stylesRouter;
