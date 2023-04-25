const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const Blogger = require("./Bloggers");
const BlogPost = require('./BlogPost');


class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      // validate: {
      //   is: /^[a-zA-Z0-9 ]*$/,
      //   len: [2, 250],
      // },
    },
    creator_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Blogger,
        key: "id",
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: BlogPost,
        key: "id",
      },
    },
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: "Comments",
  }
);

module.exports = Comment;