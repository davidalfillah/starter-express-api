import Link from "../models/LinksModels.js";

export const createLinks = async (req, res) => {
  try {
    const { name, slug, url } = req.body;
    await Link.create({
      name: name,
      slug: slug,
      url: url,
      userId: req.params.id,
    });

    res.status(201).json({ msg: "Membuat Link Berhasil" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};

export const updateOneLinks = async (req, res) => {
  const link = await Link.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!link) return res.status(404).json({ msg: "Link tidak ditemukan" });
  try {
    const { name, slug, url } = req.body;
    await Link.update(
      {
        name: name,
        slug: slug,
        url: url,
      },
      {
        where: {
          id: link.id,
        },
      }
    );
    res.status(200).json({ msg: "Link Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const createMoreLinks = async (req, res) => {
  try {
    const { links } = req.body;
    console.log(links);
    links.map(async (link) => {
      await Link.create({
        name: link.name,
        slug: link.slug,
        url: link.url,
        userId: link.userId,
      });
    });
    res.status(200).json({ msg: "Links Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const updateMoreLinks = async (req, res) => {
  try {
    const { links } = req.body;

    links.map(async (link) => {
      await Link.update(
        {
          name: link.name,
          slug: link.slug,
          url: link.url,
        },
        {
          where: {
            id: link.id,
            userId: link.userId,
          },
        }
      );
    });
    res.status(200).json({ msg: "Links Updated" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteMoreLinks = async (req, res) => {
  try {
    const { links } = req.body;
    links.map(async (link) => {
      await Link.destroy({
        where: {
          id: link.id,
        },
      });
    });

    res.status(200).json({ msg: "Link Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

export const deleteLinks = async (req, res) => {
  const link = await Link.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (!link) return res.status(404).json({ msg: "Link tidak ditemukan" });
  try {
    await Link.destroy({
      where: {
        id: link.id,
      },
    });
    res.status(200).json({ msg: "Link Deleted" });
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
