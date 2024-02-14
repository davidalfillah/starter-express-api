import express from "express";
import {
  createLinks,
  createMoreLinks,
  deleteLinks,
  deleteMoreLinks,
  updateMoreLinks,
  updateOneLinks,
} from "../controllers/Links.js";

const linkRouter = express.Router();

linkRouter.post("/link", createLinks);
linkRouter.patch("/link/:id", updateOneLinks);
linkRouter.post("/links", createMoreLinks);
linkRouter.patch("/links", updateMoreLinks);
linkRouter.post("/links-delete", deleteMoreLinks);
linkRouter.delete("/link/:id", deleteLinks);

export default linkRouter;
