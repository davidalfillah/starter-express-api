import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Resources from "../models/ResourceModels.js";
import CategoriesFilters from "./CategoriesFilters.js";

const { DataTypes } = Sequelize;

const CategoriesValues = db.define("categoriesValues", {
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
  icon: {
    type: DataTypes.STRING,
  },
  color: {
    type: DataTypes.STRING,
  },
  colorText: {
    type: DataTypes.STRING,
  },
  new: {
    type: DataTypes.BOOLEAN,
  },
  filterId: {
    type: Sequelize.UUID,
    allowNull: false,
    validate: {
      notEmpty: true,
    },
  },
});

CategoriesFilters.hasMany(CategoriesValues);
CategoriesValues.belongsTo(CategoriesFilters, { foreignKey: "filterId" });

export default CategoriesValues;
