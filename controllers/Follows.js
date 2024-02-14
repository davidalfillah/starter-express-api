import AuthorFollows from "../models/AuthorsFollowsModels.js";
import Favorite from "../models/FavoritesModels.js";
import User from "../models/UsersModels.js";

export const createFollows = async (req, res) => {
  try {
    const { userFollowingId, userFollowedgId } = req.body;
    const user = await User.findOne({
      where: { id: userFollowingId },
    });
    const findFollow = await AuthorFollows.findOne({
      where: { from: userFollowingId, to: userFollowedgId },
    });

    if (!findFollow) {
      await AuthorFollows.create({
        from: userFollowingId,
        to: userFollowedgId,
        follow: true,
      });
      return res.status(201).json({ res: true, data: user });
    } else {
      await findFollow.destroy();
      return res.status(201).json({ res: false, data: user });
    }
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
