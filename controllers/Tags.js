import Resource_Tags from "../models/Resource_TagsModels.js";
import Tags from "../models/TagsModels.js";

export const createTags = async (req, res) => {
  try {
    const { tags } = req.body;
    console.log(tags);
    tags.map(async (path, i) => {
      const tag = await Tags.findOne({ where: { name: path.name } });
      if (!tag) {
        const newTags = await Tags.create({
          name: path.name,
          slug: path.slug,
          resourceId: req.params.id,
        });
        await Resource_Tags.create({
          tagId: newTags.id,
          resourceId: req.params.id,
        });
      } else {
        await Resource_Tags.create({
          tagId: tag.id,
          resourceId: req.params.id,
        });
      }
    });

    res.status(201).json({ msg: "Membuat Tags Berhasil" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ msg: error.message });
  }
};
