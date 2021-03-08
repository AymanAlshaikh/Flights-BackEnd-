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
        validate: {
          len: [8, 12],
        },
      },
      email: {
        type: DataType.STRING,
        unique: true,
        allowNull: false,
        validate: { isEmail: true },
      },
      firstName: {
        type: DataType.STRING,
        allowNull: false,
      },
      lastName: {
        type: DataType.STRING,
        allowNull: false,
      },
      phoneNumber: {
        type: DataType.STRING,
        allowNull: false,
        validate: {
          len: [8, 10],
        },
      },
      isAirline: {
        type: DataType.BOOLEAN,
        defaultValue: false,
      },
    },
    { timestamps: false }
  );
  return User;
};
module.exports = Users;
