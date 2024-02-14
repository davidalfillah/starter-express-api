import Colors from "../models/ColorsModels.js";
import Formats from "../models/FormatsModels.js";
import Previews from "../models/PreviewsModels.js";
import Resources from "../models/ResourceModels.js";
import Styles from "../models/StylesModels.js";
import Tags from "../models/TagsModels.js";
import User from "../models/UsersModels.js";
import db from "../config/database.js";
import Search from "../models/SearchModels.js";
import Favorite from "../models/FavoritesModels.js";

const Op = db.Sequelize.Op;

const getPagination = (page, size) => {
  const limit = size ? +size : 10;
  const offset = page ? page * limit : 0;

  return { limit, offset };
};

const getPagingData = (datas, page, limit) => {
  console.log(datas);
  const { count: totalItems, rows: data } = datas;
  const currentPage = page ? +page : 0;
  const prevPage = page ? +page - 1 : 1;
  const nextPage = page ? +page + 1 : 1;
  const totalPages = Math.ceil(totalItems / limit);

  const response = {
    data,
    meta: {
      currentPage,
      prevPage,
      nextPage,
      totalPages,
      totalItems,
    },
  };

  return response;
};

export const getKeyword = async (req, res) => {
  const { page, size, title, type, color, format, style, premium, order } =
    req.query;
  var nameCondition = title ? { slug: { [Op.like]: `%${title}%` } } : null;
  try {
    const responses = await Search.findAll({
      where: nameCondition,
      limit: 10,
      order: [["count", "DESC"]],
    });
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getResources = async (req, res) => {
  const { page, size, title, type, color, format, style, premium, order } =
    req.query;
  const titless = title?.split("-");
  var nameCondition = title
    ? {
        [Op.or]: titless.map((a) => {
          return { name: { [Op.like]: `%${a}%` } };
        }),
      }
    : null;
  var typeCondition = type
    ? { type: { [Op.like]: `%${type.split("-").join(" ")}%` } }
    : null;
  var premiums = premium === "true";
  var premiumCondition = premium ? { premium: { [Op.eq]: premiums } } : null;
  var colorCondition = color ? { slug: { [Op.like]: `%${color}%` } } : null;
  var formatCondition = format ? { slug: { [Op.like]: `%${format}%` } } : null;
  var styleCondition = style ? { slug: { [Op.like]: `%${style}%` } } : null;

  try {
    if (title) {
      const titleOld = await Search.findOne({ where: { name: title } });
      if (!titleOld) {
        await Search.create({
          name: title.split("-").join(" "),
          slug: title.split(" ").join("-"),
        });
      } else {
        await Search.update(
          { count: titleOld.count + 1 },
          { where: { name: titleOld.name } }
        );
      }
    }

    let orders;

    if (order === "popular") {
      orders = [["view", "DESC"]];
    } else {
      orders = [["createdAt", "DESC"]];
    }

    const conditions = Object.assign({}, typeCondition, premiumCondition);
    const { limit, offset } = getPagination(page - 1, size);
    const response = await Resources.findAndCountAll({
      limit,
      offset,
      order: orders,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email", "avatar"],
        },
        {
          model: Colors,
          where: colorCondition,
        },
        {
          model: Formats,
          where: formatCondition,
        },
        {
          model: User,
          as: "Favorite",
        },
        {
          model: Previews,
          order: [["order", "ASC"]],
          limit: 1,
        },
        {
          model: Styles,
          where: styleCondition,
        },
        {
          model: Tags,
          where: nameCondition,
        },
      ],
      distinct: true,
      where: conditions,
    });
    const responses = getPagingData(response, page, limit);
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getResourcesByAuthor = async (req, res) => {
  const { page, size, titleAuth, type, color, format, style, premium, order } =
    req.query;
  var authorCondition = { userId: req.params.id };
  const titless = titleAuth?.split("-");
  var nameCondition = titleAuth
    ? {
        [Op.or]: titless.map((a) => {
          return { name: { [Op.like]: `%${a}%` } };
        }),
      }
    : null;
  var typeCondition = type
    ? { type: { [Op.like]: `%${type.split("-").join(" ")}%` } }
    : null;
  var premiums = premium === "true";
  var premiumCondition = premium ? { premium: { [Op.eq]: premiums } } : null;
  var colorCondition = color ? { slug: { [Op.like]: `%${color}%` } } : null;
  var formatCondition = format ? { slug: { [Op.like]: `%${format}%` } } : null;
  var styleCondition = style ? { slug: { [Op.like]: `%${style}%` } } : null;

  try {
    if (titleAuth) {
      const titleOld = await Search.findOne({ where: { name: titleAuth } });
      if (!titleOld) {
        await Search.create({
          name: titleAuth.split("-").join(" "),
          slug: titleAuth.split(" ").join("-"),
        });
      } else {
        await Search.update(
          { count: titleOld.count + 1 },
          { where: { name: titleOld.name } }
        );
      }
    }

    let orders;

    if (order === "popular") {
      orders = [["view", "DESC"]];
    } else {
      orders = [["createdAt", "DESC"]];
    }

    const conditions = Object.assign(
      {},
      typeCondition,
      premiumCondition,
      authorCondition
    );
    const { limit, offset } = getPagination(page - 1, size);
    const response = await Resources.findAndCountAll({
      where: conditions,
      limit,
      offset,
      distinct: true,
      order: orders,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email", "avatar"],
        },
        {
          model: Colors,
          where: colorCondition,
        },
        {
          model: User,
          as: "Favorite",
        },
        {
          model: Formats,
          where: formatCondition,
        },
        {
          model: Previews,
          order: [["order", "ASC"]],
          limit: 1,
        },

        {
          model: Styles,
          where: styleCondition,
        },
        {
          model: Tags,
          where: nameCondition,
        },
      ],
    });
    const responses = getPagingData(response, page, limit);
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const getResourcesByFavorite = async (req, res) => {
  const { page, size, titleAuth, type, color, format, style, premium, order } =
    req.query;
  var favoriteCondition = { id: req.params.id };
  const titless = titleAuth?.split("-");
  var nameCondition = titleAuth
    ? {
        [Op.or]: titless.map((a) => {
          return { name: { [Op.like]: `%${a}%` } };
        }),
      }
    : null;
  var typeCondition = type
    ? { type: { [Op.like]: `%${type.split("-").join(" ")}%` } }
    : null;
  var premiums = premium === "true";
  var premiumCondition = premium ? { premium: { [Op.eq]: premiums } } : null;
  var colorCondition = color ? { slug: { [Op.like]: `%${color}%` } } : null;
  var formatCondition = format ? { slug: { [Op.like]: `%${format}%` } } : null;
  var styleCondition = style ? { slug: { [Op.like]: `%${style}%` } } : null;

  try {
    if (titleAuth) {
      const titleOld = await Search.findOne({ where: { name: titleAuth } });
      if (!titleOld) {
        await Search.create({
          name: titleAuth.split("-").join(" "),
          slug: titleAuth.split(" ").join("-"),
        });
      } else {
        await Search.update(
          { count: titleOld.count + 1 },
          { where: { name: titleOld.name } }
        );
      }
    }

    let orders;

    if (order === "popular") {
      orders = [["view", "DESC"]];
    } else {
      orders = [["createdAt", "DESC"]];
    }

    const conditions = Object.assign({}, typeCondition, premiumCondition);
    const { limit, offset } = getPagination(page - 1, size);
    const response = await Resources.findAndCountAll({
      where: conditions,
      limit,
      offset,
      distinct: true,
      order: orders,
      include: [
        {
          model: User,
          as: "author",
          attributes: ["id", "name", "email", "avatar"],
        },
        {
          model: Colors,
          where: colorCondition,
        },
        {
          model: User,
          as: "Favorite",
          where: favoriteCondition,
        },
        {
          model: Formats,
          where: formatCondition,
        },
        {
          model: Previews,
          order: [["order", "ASC"]],
          limit: 1,
        },

        {
          model: Styles,
          where: styleCondition,
        },
        {
          model: Tags,
          where: nameCondition,
        },
      ],
    });
    const responses = getPagingData(response, page, limit);
    res.status(200).json(responses);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
/* export const getAuthorById = async (req, res) => {
  const { page, size, title, type, color, format, style, premium, order } =
    req.query;
  const { id } = req.params;
  console.log(id);
  try {
    const response = await User.findOne({ where: { id: id } });

    console.log(response);
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
}; */

export const getResourceById = async (req, res) => {
  try {
    const resource = await Resources.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        {
          model: User,
          as: "author",
          attributes: ["name", "email", "avatar"],
        },
        {
          model: Colors,
        },
        {
          model: Formats,
        },
        {
          model: Previews,
          order: [["order", "ASC"]],
        },
        {
          model: Styles,
        },
        {
          model: Tags,
        },
      ],
    });

    if (resource) {
      await Resources.update(
        { view: resource.view + 1 },
        { where: { id: resource.id } }
      );
    }
    res.status(200).json(resource);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const createResource = async (req, res) => {
  const {
    name,
    slug,
    description,
    type,
    premium,
    new: newes,
    authorId,
  } = req.body;
  try {
    const data = await Resources.create({
      name: name,
      slug: slug,
      description: description,
      type: type,
      premium: premium,
      new: newes,
      authorId: authorId,
      userId: authorId,
    });
    res.status(201).json(data);
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const updateResource = async (req, res) => {
  try {
    const resource = await Resources.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!resource) return res.status(404).json({ msg: "Data tidak ditemukan" });
    const { name, price } = req.body;
    if (req.isAdmin) {
      await Resources.update(
        { name, price },
        {
          where: {
            id: resource.id,
          },
        }
      );
    } else {
      if (req.userId !== resource.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Resources.update(
        { name, price },
        {
          where: {
            [Op.and]: [{ id: resource.id }, { userId: req.userId }],
          },
        }
      );
    }
    res.status(200).json({ msg: "Resource updated successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

export const deleteResource = async (req, res) => {
  try {
    const resource = await Resources.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!resource) return res.status(404).json({ msg: "Data tidak ditemukan" });
    if (req.isAdmin) {
      await Resources.destroy({
        where: {
          id: resource.id,
        },
      });
    } else {
      if (req.userId !== resource.userId)
        return res.status(403).json({ msg: "Akses terlarang" });
      await Resources.destroy({
        where: {
          [Op.and]: [{ id: resource.id }, { userId: req.userId }],
        },
      });
    }
    res.status(200).json({ msg: "Resource deleted successfuly" });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};
