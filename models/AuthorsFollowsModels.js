import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Resources from "../models/ResourceModels.js";
import User from "./UsersModels.js";

const { DataTypes } = Sequelize;

const AuthorFollows = db.define("authorFollows", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  from: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  to: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  follow: DataTypes.BOOLEAN,
});

User.belongsToMany(User, {
  through: AuthorFollows,
  as: "from",
  foreignKey: "from",
  useJunctionTable: false,
});
User.belongsToMany(User, {
  through: AuthorFollows,
  as: "to",
  foreignKey: "to",
  useJunctionTable: false,
});

export default AuthorFollows;
