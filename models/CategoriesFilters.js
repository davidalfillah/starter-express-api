import { Sequelize } from "sequelize";
import db from "../config/database.js";

const { DataTypes } = Sequelize;

const CategoriesFilters = db.define("categoriesFilters", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  icon: {
    type: DataTypes.STRING,
  },
  info: {
    type: DataTypes.STRING,
  },
  type: {
    type: DataTypes.STRING,
  },
  param: {
    type: DataTypes.STRING,
  },
  new: {
    type: DataTypes.BOOLEAN,
  },
  defaultExpanded: {
    type: DataTypes.BOOLEAN,
  },
});

export default CategoriesFilters;
