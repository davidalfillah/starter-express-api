import express from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  getUsers,
  updateUser,
} from "../controllers/User.js";
import { verifyUser } from "../middleware/authUser.js";

const userRouter = express.Router();

userRouter.get("/users", getUsers);
userRouter.get("/users/:id", getUserById);
userRouter.post("/users", createUser);
userRouter.patch("/users/:id", updateUser);
userRouter.delete("/users/:id", deleteUser);

export default userRouter;
