import { Sequelize, UUIDV4 } from "sequelize";
import db from "../config/database.js";
import User from "./UsersModels.js";
import Resources from "./ResourceModels.js";

const { DataTypes } = Sequelize;

const FilesData = db.define("filesData", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  resourceId: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Resources.hasMany(FilesData);
FilesData.belongsTo(Resources, { foreignKey: "resourceId" });

export default FilesData;
