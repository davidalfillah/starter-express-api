import Styles from "../models/StylesModels.js";

export const createStyles = async (req, res) => {
  try {
    const { styles } = req.body;
    styles.map(async (path, i) => {
      await Styles.create({
        name: path,
        slug: path.toLowerCase().split(" ").join("-"),
        resourceId: req.params.id,
      });
    });

    res.status(201).json({ msg: "Membuat Styles Berhasil" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
