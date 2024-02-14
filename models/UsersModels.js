import { Sequelize, UUIDV4 } from "sequelize";
import db from "../config/database.js";
import Link from "./LinksModels.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { DataTypes } = Sequelize;
const User = db.define(
  "users",
  {
    id: {
      allowNull: false,
      primaryKey: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    avatar: {
      type: DataTypes.STRING, // Link ke avatar pengguna
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    lastLogin: {
      type: DataTypes.DATE,
    },
  },
  {
    freezeTableName: true,
  }
);

// Hashing password before saving to database
User.beforeCreate(async (user) => {
  const saltRounds = 10;
  user.password = await bcrypt.hash(user.password, saltRounds);
});

// Generate JWT token for user
User.prototype.generateAuthToken = function () {
  const token = jwt.sign(
    { userId: this.id, isAdmin: this.isAdmin },
    "adase1212dfasdfsad1321scsacsc13212"
  ); // Ganti dengan kunci rahasia yang kuat
  return token;
};

// Verifikasi password
User.prototype.verifyPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Logging last login timestamp
User.prototype.logLastLogin = function () {
  this.lastLogin = new Date();
  this.save();
};

export default User;
