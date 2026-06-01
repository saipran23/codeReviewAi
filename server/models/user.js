import { Sequelize, DataTypes } from "sequelize";

function createUserModel(sequelize) {
  return sequelize.define(
    "User",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },

      githubId: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        field: "github_id",
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      accessToken: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "access_token",
      },
    },
    {
      tableName: "users",
      underscored: true,
      timestamps: true,
    },
  );
}

export default createUserModel;
