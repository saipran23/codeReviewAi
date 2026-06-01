import sequelize from "../config/database.js";

import createUserModel from "./user.js";
import createReviewModel from "./Review.js";
import createReviewCommentModel from "./reviewComment.js";

const User = createUserModel(sequelize);
const Review = createReviewModel(sequelize);
const ReviewComment = createReviewCommentModel(sequelize);

User.hasMany(Review, { foreignKey: "user_id", as: "reviews" });
Review.belongsTo(User, { foreignKey: "user_id", as: "user" });

Review.hasMany(ReviewComment, { foreignKey: "review_id", as: "comments" });
ReviewComment.belongsTo(Review, { foreignKey: "review_id", as: "review" });

async function initializeDatabase() {
  await sequelize.authenticate();
  await sequelize.sync();
}

export { sequelize, initializeDatabase, User, Review , ReviewComment};
