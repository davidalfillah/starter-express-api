import Resources from "../models/ResourceModels";
import QueryInterface from "pg-search-sequelize";
import SearchModel from "pg-search-sequelize";
import User from "../models/UsersModels";
import Tags from "../models/TagsModels";

// The model we're creating the materialized view for
const referenceModel = Resources;

const materializedViewName = "searchResource";

const attributes = {
  name: "A", // name has the highest weight.
  slug: "B",
  type: "C", // city has a lower weight than title and description
};

const options = {
  include: [
    // You can also include fields from associated models
    {
      model: User,
      attributes: {
        // Those attributes get added to the materialized view's search document and will also be searched just like the other fields
        name: "D",
      },
    },
    {
      model: Tags,
      attributes: {
        // Those attributes get added to the materialized view's search document and will also be searched just like the other fields
        name: "D",
        slug: "D",
      },
    },
  ],
};
export default {
  up: (queryInterface) =>
    new QueryInterface(queryInterface).createMaterializedView(
      materializedViewName,
      referenceModel,
      attributes,
      options
    ),

  down: (queryInterface) =>
    new QueryInterface(queryInterface).dropMaterializedView(
      materializedViewName
    ),
};

let FilmMaterializedView = sequelize.define(
  "FilmMaterializedView",
  {
    name: DataTypes.STRING,
    rating: DataTypes.INTEGER,
    document: DataTypes.TEXT,
  },
  {
    referenceModel: models.Film, // The model for which we're defining the materialized view
  }
);

FilmMaterializedView = new SearchModel(FilmMaterializedView); // Adds search, searchByText, and refresh class methods to the model.
