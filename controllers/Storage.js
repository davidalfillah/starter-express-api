import multer from "multer";
import User from "../models/UsersModels.js";
import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dir = "http://localhost:3307/";

const unlinkPromise = (avatar) => {
  new Promise((resolve, reject) => {
    fs.unlink(
      process.cwd() + `/public/avatars/${avatar.dataValues.avatar}`,
      (err) => {
        if (err) reject(err);
        resolve(avatar.dataValues.avatar);
      }
    );
  });
};

const storagesAvatar = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/avatars");
  },
  filename: function (req, file, callback) {
    console.log(req.query);
    let { name } = req.query;
    const extension = file.mimetype.split("/")[1];
    const uniqueSuffix =
      name + "-" + Math.round(Math.random() * 1e9) + "-wearstock";
    callback(null, uniqueSuffix + "." + extension);
  },
});

const storagesThumb = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/thumb");
  },
  filename: function (req, file, callback) {
    console.log(req.query);
    let { name } = req.query;
    const extension = file.mimetype.split("/")[1];
    const uniqueSuffix =
      name + "-" + Math.round(Math.random() * 1e9) + "-wearstock";
    callback(null, uniqueSuffix + "." + extension);
  },
});

const storagesFile = multer.diskStorage({
  destination: function (req, file, callback) {
    callback(null, "./public/fileResource");
  },
  filename: function (req, file, callback) {
    let { name } = req.query;
    const extension = file.mimetype.split("/")[1];
    const uniqueSuffix =
      name + "-" + Math.round(Math.random() * 1e9) + "-wearstock";
    callback(null, uniqueSuffix + "." + extension);
  },
});

const avatarStorage = multer({ storage: storagesAvatar }).single("file");
const fileStorage = multer({ storage: storagesFile }).single("file-resource");
const thumbStorage = multer({ storage: storagesThumb }).array(
  "thumb-files",
  10
);

export const uploadAvatar = async (req, res) => {
  avatarStorage(req, res, async function (err) {
    try {
      if (err) {
        return res.end(err.toString());
      }
      const user = await User.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!user) return res.status(404).json({ msg: "User tidak ditemukan" });
      await User.update(
        {
          avatar: req.file.filename,
        },
        {
          where: {
            id: user.id,
          },
        }
      );
      if (user.dataValues.avatar) {
        unlinkPromise(user);
      }
      res.status(200).json({
        originalname: req.file.originalname,
        uploadname: req.file.filename,
        path: req.file.path,
      });
    } catch (err) {
      res.status(500).send({
        message: "Could not delete the file. " + err,
      });
    }
  });
};

export const uploadThumb = async (req, res) => {
  thumbStorage(req, res, async function (err) {
    try {
      res.status(200).json(req.files);
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });
};

export const uploadFile = async (req, res) => {
  fileStorage(req, res, async function (err) {
    try {
      res.status(200).json({
        originalname: req.file.originalname,
        uploadname: req.file.filename,
        path: req.file.path,
      });
    } catch (err) {
      res.status(500).send({
        message: err,
      });
    }
  });
};
