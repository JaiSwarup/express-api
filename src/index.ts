import express from "express";
import config from "./config";
import expressLayout from "express-ejs-layouts";
import FaqController from "@/controllers/FaqController";

const app = express();

//TEMPLATE ENGINE
app.use(express.static("public"));
app.set("view engine", "ejs");
app.use(expressLayout);
app.set("layout", "./layouts/main");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  FaqController.getFAQs(req, res);
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
