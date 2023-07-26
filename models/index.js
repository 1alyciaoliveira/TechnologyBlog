const User = require('./User');
const BlogPosts = require('./blogPosts');
const Comment = require('./comment');

User.hasMany(BlogPosts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPosts.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

User.hasMany(Comment, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'

});

BlogPosts.hasMany(Comment, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

Comment.belongsTo(BlogPosts, {
    foreignKey: 'blog_id',
    onDelete: 'CASCADE'
});

module.exports = { User, BlogPosts, Comment };