import { Sequelize } from "sequelize";
import db from "../config/database.js";
import Resources from "../models/ResourceModels.js";
import User from "./UsersModels.js";

const { DataTypes } = Sequelize;

const Favorite = db.define("faforites", {
  id: {
    allowNull: false,
    primaryKey: true,
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
  },
  favorite: DataTypes.BOOLEAN,
});
Resources.belongsToMany(User, { through: Favorite, as: "Favorite" });
User.belongsToMany(Resources, { through: Favorite, as: "Favorite" });

export default Favorite;
