import express from "express";
import config from "./config";
import morgan from "morgan";
import helmet from "helmet";
import swaggerUi from "swagger-ui-express";
import swaggerJSDoc from "swagger-jsdoc";
import expressLayout from "express-ejs-layouts";
import routes from "./routes";

const app = express();

//TEMPLATE ENGINE
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "./layouts/main");

app.use(express.json());
app.use(morgan("dev"));
app.use(helmet());
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

app.use("/api/v1", routes);
app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
