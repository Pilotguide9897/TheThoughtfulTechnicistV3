const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

const bloggers = require('./userData.json');
const blogPosts = require('./blogPost.json');
const commentData = require('./comment.json');
const Blogger = require("../models/Bloggers");
const { BlogPost, Comment } = require("../models");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const users = await Blogger.bulkCreate(bloggers, {
    individualHooks: true,
    returning: true,
  });

 const posts = await BlogPost.bulkCreate(blogPosts, {
   individualHooks: true,
   returning: true,
 });  

 const comments = await Comment.bulkCreate(commentData, {
   individualHooks: true,
   returning: true,
 });

  process.exit(0);
};

seedDatabase();


