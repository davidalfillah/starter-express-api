import Link from "../models/LinksModels.js";
import User from "../models/UsersModels.js";
import db from "../config/database.js";
import Resources from "../models/ResourceModels.js";
import AuthorFollows from "../models/AuthorsFollowsModels.js";
import Download from "../models/DownloadsModels.js";

const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 3;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (datas, page, limit) => {
  const { count: totalItems, rows: data } = datas;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  const response = {
    data,
    meta: {
      currentPage,
      totalPages,
      totalItems,
    },
  };

  return response;
};

export const getUsers = async (req, res) => {
  const { page, size, title } = req.query;
  var condition = title ? { name: { [Op.like]: `%${title}%` } } : null;

  try {
    const { limit, offset } = getPagination(page - 1, size);
    const response = await User.findAndCountAll({
      attributes: [
        "id",
        "name",
        "username",
        "slug",
        "email",
        "isAdmin",
        "avatar",
      ],
      where: condition,
      limit,
      offset,
      include: [{ model: Link }],
    });
    const responses = getPagingData(response, page, limit);
    res.status(200).json(responses);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const getUserById = async (req, res) => {
  console.log(req.params.id);
  try {
    const data = await User.findOne({
      attributes: [
        "id",
        "name",
        "username",
        "slug",
        "email",
        "isAdmin",
        "avatar",
      ],
      include: [{ model: Link }, { model: User, as: "to" }],
      where: {
        id: req.params.id,
      },
    });
    const assets = await Resources.count({
      where: {
        authorId: req.params.id,
      },
    });
    const followers = await AuthorFollows.count({
      where: {
        to: req.params.id,
      },
    });
    const followed = await AuthorFollows.findOne({
      where: {
        from: req.params.id,
      },
    });
    const downloads = await Download.count({
      where: {
        userId: req.params.id,
      },
    });
    const response = {
      data: data,
      meta: {
        assets: assets,
        followers: followers,
        followed: followed,
        downloads: downloads,
      },
    };
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: error.message });
  }
};

export const createUser = async (req, res) => {
  try {
    const { name, slug, email, password, avatar, isAdmin } = req.body;

    const generateUsername = (wordA, wordB) => {
      const word1 = wordA ? wordA : "";
      const word2 = wordB ? wordB : "";
      const time = new Date();
      const date = time.toLocaleDateString("en-US");
      const suffix = date.split("/");
      const prefix = ["great", "good", "the", "brilliant"];

      let suggestions = [];
      suggestions.push(`${word1}${word2}`);
      suffix.forEach((word) => {
        suggestions.push(`${word1}${word}${word2}`);
        suggestions.push(`${word1}${word}`);
        suggestions.push(`${word2}${word}`);
        suggestions.push(`${word1}${word2}${word}`);
      });
      prefix.forEach((word) => {
        suggestions.push(`${word1}${word}${word2}`);
        suggestions.push(`${word}${word1}`);
        suggestions.push(`${word}${word2}`);
        suggestions.push(`${word1}${word}${word2}`);
      });

      return suggestions;
    };

    const genUsername = generateUsername(
      name.toLocaleLowerCase().split(" ")[0],
      name.toLocaleLowerCase().split(" ")[1]
    );
    let colour;
    for (colour of genUsername) {
      const user = await User.findOne({ where: { username: colour } });
      console.log(user);
      if (!user) {
        console.log("The yessiest colour!" + colour);
        break;
      }
    }

    let username = colour.toLowerCase();

    const user = await User.findOne({ where: { email: email } });
    if (user) return res.status(400).json({ msg: "Email sudah digunakan" });
    await User.create({
      name,
      username,
      slug,
      email,
      password,
      avatar,
      isAdmin,
    });

    res.status(201).json({ msg: "Register Berhasil" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};

export const updateUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  const { name, slug, email, password, isAdmin } = req.body;
  try {
    await User.update(
      {
        name: name,
        slug: slug,
        email: email,
        password: password,
        isAdmin: isAdmin,
      },
      {
        where: {
          id: user.id,
        },
      }
    );
    res.status(200).json({ msg: "User Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const user = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
  try {
    await User.destroy({
      where: {
        id: user.id,
      },
    });
    res.status(200).json({ msg: "User Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
