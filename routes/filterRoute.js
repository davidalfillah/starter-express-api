import express from "express";
import { getCategoryFilter } from "../controllers/Filters.js";

const filterRouter = express.Router();

filterRouter.get("/filter-all", getCategoryFilter);

export default filterRouter;
