import { Sequelize, UUIDV4 } from "sequelize";
import db from "../config/database.js";
import Resources from "../models/ResourceModels.js";

const { DataTypes } = Sequelize;

const Search = db.define("searches", {
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
  count: {
    type: DataTypes.INTEGER,
  },
  slug: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export default Search;
