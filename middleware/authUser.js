import User from "../models/UsersModels.js";
import jwt from "jsonwebtoken";

export const verifyUser = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const userId = jwt.decode(req.session.userId);
  const user = await User.findOne({
    where: { id: userId?.userId },
    attributes: ["id", "name", "email", "isAdmin", "avatar"],
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  req.userId = user.id;
  req.isAdmin = user.isAdmin;
  next();
};

export const adminOnly = async (req, res, next) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
  }
  const userId = jwt.decode(req.session.userId);
  const user = await User.findOne({
    where: { id: userId?.userId },
    attributes: ["id", "name", "email", "isAdmin", "avatar"],
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  if (!user.isAdmin) return res.status(403).json({ msg: "Akses terlarang" });
  next();
};
