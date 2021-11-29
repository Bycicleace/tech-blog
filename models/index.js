const Post = require('./Post');
const Comment = require('./Comment');
const User = require('./User');

// User has many posts
// post belongs to user
User.hasMany(Post, {
    foreignKey: 'user_id'
});

Post.belongsTo(User, {
    foreignKey: 'user_id'
});

// User has many comments
// comment belongs to user
User.hasMany(Comment, {
    foreignKey: 'user_id'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id'
});

// post has many comments
// comment belongs to user
Post.hasMany(Comment, {
    foreignKey: 'post_id'
});

Comment.belongsTo(Post, {
    foreignKey: 'post_id'
});

module.exports = { User, Post, Comment };