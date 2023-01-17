import { Sequelize } from "sequelize";

export default async function () {
  const { DB_HOST, DB_NAME, DB_USER, DB_PASSWORD } = process.env;
  const sequelize = new Sequelize({
    dialect: "mysql",
    host: DB_HOST,
    database: DB_NAME,
    username: DB_USER,
    password: DB_PASSWORD,
    logging: false,
  });
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    throw `Unable to connect to the database: , ${error}`;
  }
}
