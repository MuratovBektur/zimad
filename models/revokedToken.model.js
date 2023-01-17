import { DataTypes } from "sequelize";
export default (sequelize) => {
  return sequelize.define("RevokedToken", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    exp: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
};
