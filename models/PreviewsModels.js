import { Sequelize, UUIDV4 } from "sequelize";
import db from "../config/database.js";
import User from "./UsersModels.js";
import Resources from "./ResourceModels.js";

const { DataTypes } = Sequelize;

const Previews = db.define("previews", {
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
  order: {
    type: DataTypes.INTEGER,
  },
  resourceId: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

Resources.hasMany(Previews);
Previews.belongsTo(Resources, { foreignKey: "resourceId" });

export default Previews;
