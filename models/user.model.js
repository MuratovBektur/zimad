import { DataTypes } from "sequelize";

export default (sequelize) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      validate: {
        validator: function (str) {
          const isValid = !!(
            str.match(/^[0-9\+]{9,15}$/) ||
            str.match(
              /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
            )
          );
          if (!isValid) {
            throw new TypeError("id must be valid phone number or valid email");
          }
        },
      },
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });
  return User;
};
