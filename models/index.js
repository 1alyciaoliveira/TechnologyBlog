const User = require('./User');
const BlogPosts = require('./blogPosts');

User.hasMany(BlogPosts, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE'
});

BlogPosts.belongsTo(User, {
    foreignKey: 'user_id'
});

module.exports = { User, BlogPosts };