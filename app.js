import express from "express";
import "./services/applyEnvConfig.js";

import apiRouter from "./routes/api.route.js";
import db from "./models/index.js";

const app = express();
const port = process.env.PORT;

if (!port) {
  throw "PORT is not defined. Check env files";
}

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  res.header("Access-Control-Allow-Methods", "*");
  next();
});

app.use(function (err, req, res, next) {
  console.error(err.stack);
  res.status(500).json("error");
});

const start = async () => {
  try {
    db.sequelize
      .sync()
      .then(() => {
        console.log("Synced db.");
      })
      .catch((err) => {
        console.log("Failed to sync db: " + err.message);
      });
    app.use(express.json());
    app.use("/", apiRouter);
    app.listen(port, () => console.log(`Running on port ${port}`));
  } catch (e) {
    console.error(e);
  }
};

start();
