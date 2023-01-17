import { Sequelize } from "sequelize";
import fs from "fs";
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import "../services/applyEnvConfig.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const basename = path.basename(__filename);

const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;

const sequelize = new Sequelize({
  dialect: "mysql",
  host: DB_HOST,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
});
try {
  await sequelize.authenticate();

  console.log("Connection has been established successfully.");
} catch (error) {
  throw `Unable to connect to the database: , ${error}`;
}

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;
// берем все имена файлов моделей (например user.model.js)
const modelNames = fs
  .readdirSync(__dirname)
  .filter((file) => file !== basename);

await Promise.all(
  modelNames.map(async (file) => {
    // получаем обьекты моделей и добавляем в обьект db
    const fn = await import(path.join(__dirname, file));
    const model = fn.default(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  })
);

export default db;
