import { Sequelize, DataTypes } from "sequelize";

function createReviewCommentModel(sequelize) {
  return sequelize.define(
    "ReviewComment",
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      reviewId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "review_id",
      },
      fileName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: "file_name",
      },
      lineNumber: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: "line_number",
      },
      message: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
    },
    {
      tableName: "review_comments",
      underscored: true,
    },
  );
}
export default createReviewCommentModel;
