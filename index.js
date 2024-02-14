import express from "express";
import cors from "cors";
import session from "express-session";
import SequelizeStore from "connect-session-sequelize";
import { logger } from "./middleware/logEvent.js";
import userRouter from "./routes/userRoute.js";
import db from "./config/database.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import resourceRouter from "./routes/resourceRoute.js";
import { fileURLToPath } from "url";
import { dirname } from "path";
import linkRouter from "./routes/linkRoute.js";
import uploadRouter from "./routes/uploadRoute.js";
import filterRouter from "./routes/filterRoute.js";
import colorRouter from "./routes/colorsRoute.js";
import formatRouter from "./routes/formatRoute.js";
import stylesRouter from "./routes/stylesRoute.js";
import fileRouter from "./routes/fileRoutes.js";
import tagsRouter from "./routes/tagsRoute.js";
import favorieRouter from "./routes/favoriteRoute.js";
import Favorite from "./models/FavoritesModels.js";
import AuthorFollows from "./models/AuthorsFollowsModels.js";
import followRouter from "./routes/followRoute.js";
import User from "./models/UsersModels.js";
import Colors from "./models/ColorsModels.js";
import Download from "./models/DownloadsModels.js";
import FilesData from "./models/FilesModels.js";
import Formats from "./models/FormatsModels.js";
import Link from "./models/LinksModels.js";
import Previews from "./models/PreviewsModels.js";
import Resources from "./models/ResourceModels.js";
import Resource_Tags from "./models/Resource_TagsModels.js";
import Search from "./models/SearchModels.js";
import Styles from "./models/StylesModels.js";
import Tags from "./models/TagsModels.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config();
const PORT = process.env.PORT || 3307;

const app = express();
app.use(logger);

const whitelist = [
  "http://localhost:3307",
  "http://localhost:5173",
  "http://192.168.1.12:5173",
];
const corsOptions = {
  credentials: true,
  origin: (origin, callback) => {
    console.log(origin);
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  optionsSuccessStatus: 200,
};

const sessionStore = SequelizeStore(session.Store);

const store = new sessionStore({
  db: db,
});

app.use(
  session({
    secret: "fsafasfsg3erwerqw4eq4e35t643tsfgsdgwsagawgfasfw3we4t4",
    resave: false,
    saveUninitialized: true,
    store: store,
    cookie: {
      secure: "auto",
    },
  })
);

app.use(cors(corsOptions));
try {
  await db.authenticate();
  console.log("Database Connected ...");
} catch (error) {
  console.log(error);
}

app.use(express.static("public"));
app.use(express.json());
app.use(userRouter);
app.use(authRouter);
app.use(resourceRouter);
app.use(linkRouter);
app.use(uploadRouter);
app.use(filterRouter);
app.use(colorRouter);
app.use(formatRouter);
app.use(stylesRouter);
app.use(fileRouter);
app.use(tagsRouter);
app.use(favorieRouter);
app.use(followRouter);

/* User.sync({ force: true });
AuthorFollows.sync({ force: true });
Colors.sync({ force: true });
Download.sync({ force: true });
Favorite.sync({ force: true });
FilesData.sync({ force: true });
Formats.sync({ force: true });
Link.sync({ force: true });
Previews.sync({ force: true });
Resources.sync({ force: true });
Resource_Tags.sync({ force: true });
Search.sync({ force: true });
Styles.sync({ force: true });
Tags.sync({ force: true }); */
/* AuthorFollows.sync({ force: true }); */

/* db.sync({ force: true })
  .then(() => {
    console.log("Tabel berhasil dibuat!");
  })
  .catch((error) => {
    console.error("Terjadi kesalahan:", error);
  }); */

app.listen(PORT, () => console.log(`server running at port ${PORT}`));
