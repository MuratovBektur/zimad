import { DataTypes } from "sequelize";
export default (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};
