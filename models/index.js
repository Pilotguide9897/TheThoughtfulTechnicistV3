const BlogPost = require('./BlogPost');
const Blogger = require('./Bloggers');
const Bloggers = require('./Bloggers');
const Comment = require('./Comments');

// Blogger-Blogpost Association
Blogger.hasMany(BlogPost, {
  foreignKey: "creator_id",
  onDelete: "CASCADE",
});

BlogPost.belongsTo(Blogger, {
  foreignKey: "creator_id",
});

// Blogger-Comment Association
Blogger.hasMany(Comment, {
    foreignKey: "creator_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(Blogger, {
    foreignKey: "creator_id",
});

// BlogPost-Comment Association
BlogPost.hasMany(Comment, {
    foreignKey: "post_id",
    onDelete: "CASCADE",
});

Comment.belongsTo(BlogPost, {
    foreignKey: "post_id",
});

module.exports = {
    BlogPost,
    Bloggers,
    Comment,
};