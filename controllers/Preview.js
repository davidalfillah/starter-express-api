import Previews from "../models/PreviewsModels.js";

export const createPreviews = async (req, res) => {
  try {
    const { file } = req.body;
    file.map(async (path, i) => {
      await Previews.create({
        order: i,
        url: path.filename,
        resourceId: req.params.id,
      });
    });

    res.status(201).json({ msg: "Membuat Link Berhasil" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
