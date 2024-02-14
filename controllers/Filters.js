import CategoriesFilters from "../models/CategoriesFilters.js";
import CategoriesValues from "../models/CategoriesValues.js";

export const getCategoryFilter = async (req, res) => {
  try {
    const response = await CategoriesFilters.findAll({
      include: { model: CategoriesValues },
    });

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
