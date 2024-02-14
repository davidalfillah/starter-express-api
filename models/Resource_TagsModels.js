import { Sequelize, UUIDV4 } from "sequelize";
import db from "../config/database.js";
import Resources from "./ResourceModels.js";
import Tags from "./TagsModels.js";

const { DataTypes } = Sequelize;

const Resource_Tags = db.define(
  "resource_tags",
  {
    selfGranted: DataTypes.BOOLEAN,
  },
  { timestamps: false }
);
Resources.belongsToMany(Tags, { through: Resource_Tags });
Tags.belongsToMany(Resources, { through: Resource_Tags });

export default Resource_Tags;
