import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Resources from "../models/ResourceModels.js";
import User from "./UsersModels.js";

const { DataTypes } = Sequelize;

const Download = db.define("downloads", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  resourceId: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
  userId: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

User.hasMany(Download);
Resources.hasMany(Download);
Download.belongsTo(Resources, { foreignKey: "resourceId" });
Download.belongsTo(User, { foreignKey: "userId" });

export default Download;
