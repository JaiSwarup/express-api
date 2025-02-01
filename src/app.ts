import express from "express";
import config from "./config";
import morgan from "morgan";
import helmet from "helmet";
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
      title: "Express API with Swagger",
      version: "0.1.0",
      description:
        "This is a simple CRUD API application made with Express and documented with Swagger",
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

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
