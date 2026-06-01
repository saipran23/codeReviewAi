import { Sequelize, DataTypes } from "sequelize";

function createReviewModel(sequelize) {
  return sequelize.define(
    "Review",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "user_id",
      },
      prUrl: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "pr_url",
      },
      diffText: {
        type: DataTypes.TEXT,
        allowNull: false,
        field: "diff_text",
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "reviews",
      underscored: true,
    },
  );
}

export default createReviewModel;
