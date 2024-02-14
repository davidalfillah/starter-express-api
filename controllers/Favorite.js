import Favorite from "../models/FavoritesModels.js";
import Resources from "../models/ResourceModels.js";
import User from "../models/UsersModels.js";

export const createFavorites = async (req, res) => {
  try {
    const { userId, resourceId } = req.body;
    const user = await User.findOne({
      where: { id: userId },
    });
    const findFavorites = await Favorite.findOne({
      where: { resourceId: resourceId, userId: userId },
    });

    if (!findFavorites) {
      await Favorite.create({
        userId: userId,
        resourceId: resourceId,
        favorite: true,
      });
      return res.status(201).json({ res: true, data: user });
    } else {
      await findFavorites.destroy();
      return res.status(201).json({ res: false, data: user });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};

export const getFavoritesById = async (req, res) => {
  try {
    const { userId } = req.body;
    const findFavorites = await Resources.findAndCountAll({
      include: [{ model: Favorite, where: { userId: userId } }],
    });

    return res.status(201).json({ findFavorites });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
