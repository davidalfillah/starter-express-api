import express from "express";
import {
  getResources,
  getResourceById,
  createResource,
  updateResource,
  deleteResource,
  getKeyword,
  getResourcesByAuthor,
  getResourcesByFavorite,
} from "../controllers/Resources.js";
import { adminOnly } from "../middleware/authUser.js";

const resourceRouter = express.Router();

resourceRouter.get("/keyword", getKeyword);
resourceRouter.get("/resources", getResources);
resourceRouter.get("/resources/:id", getResourceById);
resourceRouter.get("/resources/author/:id", getResourcesByAuthor);
resourceRouter.get("/resources/favorite/:id", getResourcesByFavorite);
resourceRouter.post("/resources", createResource);
resourceRouter.patch("/resources/:id", updateResource);
resourceRouter.delete("/resources/:id", deleteResource);

export default resourceRouter;
