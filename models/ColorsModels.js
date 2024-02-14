import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Resources from "../models/ResourceModels.js";

const { DataTypes } = Sequelize;

const Colors = db.define("colors", {
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
  code: {
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

Resources.hasMany(Colors);
Colors.belongsTo(Resources, { foreignKey: "resourceId" });

export default Colors;
