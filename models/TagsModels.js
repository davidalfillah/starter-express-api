import { Sequelize, UUIDV4 } from "sequelize";
import db from "../config/database.js";
import Resources from "../models/ResourceModels.js";

const { DataTypes } = Sequelize;

const Tags = db.define("tags", {
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
  resourceId: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

export default Tags;
