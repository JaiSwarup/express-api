import express from "express";
import config from "./config";
import morgan from "morgan";
import helmet from "helmet";
import redisClient from "./libs/redisClient";
import connectToDatabase from "./config/dbConfig";
import { connectToRedis } from "./config/cacheConfig";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import expressLayout from "express-ejs-layouts";
import Server from "./routes";

const app = express();

//TEMPLATE ENGINE
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "./layouts/main");

app.use(express.json());
app.use(morgan("dev"));
const scriptSources = ["'self'", "'unsafe-inline'"];
const styleSources = ["'self'", "'unsafe-inline'"];
const fontSources = ["'self'"];
const imgSources = [
  "'self'",
  "https://github.com",
  "https://avatars.githubusercontent.com",
];
const connectSources = ["'self'"];
const frameSources = ["'self'"];
const scriptSourcesElem = [
  "'self'",
  "https://cdn.jsdelivr.net/",
  "'unsafe-inline'",
];

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'none'"],
      scriptSrc: scriptSources,
      // styleSrc: styleSources,
      // fontSrc: fontSources,
      imgSrc: imgSources,
      connectSrc: connectSources,
      // frameSrc: frameSources,
      scriptSrcElem: scriptSourcesElem,
    },
  })
);
app.use(express.urlencoded({ extended: true }));

const options = {
  definition: {
    openapi: "3.1.0",
    info: {
      title: "FAQ API",
      version: "1.0.0",
      description:
        "A simple Express/Node.js FAQ API with admin dashboard.\n Uses Prisma ORM and MongoDB for data storage and Redis for cache.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["swagger.yaml"],
};

const specs = swaggerJSDoc(options);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/v1", new Server().router);

app.listen(config.port, async () => {
  await connectToDatabase();
  await connectToRedis();
  console.log(`Server is running on http://localhost:${config.port}`);
});
