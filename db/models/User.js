const sequelize = require("sequelize");

const Users = (sequelize, DataType) => {
  const User = sequelize.define(
    "User",
    {
      username: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
      },
      password: {
        type: DataType.STRING,
        allowNull: false,
      },
      email: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      firstname: {
        type: DataType.STRING,
        allowNull: false,
      },
      lastname: {
        type: DataType.STRING,
        allowNull: false,
      },
      phonenumber: {
        type: DataType.INTEGER,
        allowNull: false,
      },
      type: {
        type: DataType.BOOLEAN,
      },
    },
    { timestamps: false }
  );
  return User;
};
module.exports = Users;
