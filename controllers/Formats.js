import Formats from "../models/FormatsModels.js";

export const createFormats = async (req, res) => {
  try {
    const { formats } = req.body;
    formats.map(async (path, i) => {
      await Formats.create({
        name: path.name,
        slug: path.slug,
        resourceId: req.params.id,
      });
    });

    res.status(201).json({ msg: "Membuat Formats Berhasil" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
