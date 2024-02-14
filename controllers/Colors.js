import Colors from "../models/ColorsModels.js";

export const createColors = async (req, res) => {
  try {
    const { colors } = req.body;
    colors.map(async (path, i) => {
      await Colors.create({
        name: path.name,
        slug: path.slug,
        code: path.code,
        resourceId: req.params.id,
      });
    });

    res.status(201).json({ msg: "Membuat Colors Berhasil" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
