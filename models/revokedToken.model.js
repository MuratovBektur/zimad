import { DataTypes } from "sequelize";

export default (sequelize) => {
  return sequelize.define("RevokedToken", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
