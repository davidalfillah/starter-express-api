import Link from "../models/LinksModels.js";
import User from "../models/UsersModels.js";
import jwt from "jsonwebtoken";

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({ error: "Email salah." });
    }

    const isValidPassword = await user.verifyPassword(password);

    if (!isValidPassword) {
      return res.status(401).json({ error: "password salah." });
    }

    // Generate authentication token
    const token = user.generateAuthToken();
    req.session.userId = token;
    // Log last login timestamp
    user.logLastLogin();

    res.json({ user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal melakukan login." });
  }
};

export const me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ msg: "Mohon login ke akun anda!" });
  }
  const userId = jwt.decode(req.session.userId);
  const user = await User.findOne({
    where: { id: userId?.userId },
    attributes: ["id", "name", "slug", "email", "isAdmin", "avatar"],
    include: [{ model: Link }],
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  res.status(200).json(user);
};

export const logout = async (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ msg: "Tidak dapat logout" });
    return res.status(200).json({ message: "Berhasil logout." });
  });
};
