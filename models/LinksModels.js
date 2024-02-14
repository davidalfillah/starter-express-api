import { Sequelize, UUIDV4 } from "sequelize";
import db from "../config/database.js";
import User from "./UsersModels.js";

const { DataTypes } = Sequelize;

const Link = db.define("links", {
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
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.hasMany(Link);
Link.belongsTo(User, { foreignKey: "userId" });

export default Link;
