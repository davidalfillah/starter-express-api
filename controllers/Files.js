import FilesData from "../models/FilesModels.js";

export const createFiles = async (req, res) => {
  try {
    const { dataFile } = req.body;
    await FilesData.create({
      url: dataFile.data.uploadname,
      resourceId: req.params.id,
    });

    res.status(201).json({ msg: "Membuat File Berhasil" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
