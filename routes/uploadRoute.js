import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/User.js";
import { verifyUser } from "../middleware/authUser.js";
import {
  uploadAvatar,
  uploadFile,
  uploadThumb,
} from "../controllers/Storage.js";
import { createPreviews } from "../controllers/Preview.js";

const uploadRouter = express.Router();

uploadRouter.post("/upload/avatar/:id", uploadAvatar);
uploadRouter.post("/upload/thumb/", uploadThumb);
uploadRouter.post("/upload/file/", uploadFile);
uploadRouter.post("/thumb/:id", createPreviews);

export default uploadRouter;
