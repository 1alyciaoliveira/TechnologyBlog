const sequelize = require('../config/connection');
const { User, BlogPosts } = require('../models');

const userData = require('./userData.json');
const blogPostsData = require('./blogPostsData.json');

const seedDatabase = async () => {
    await sequelize.sync({ force: true });

    const user = await User.bulkCreate(userData, {
        individualHooks: true,
        returning: true,
    });

    for (const blogPosts of blogPostsData) {
        await BlogPosts.create({
            ...blogPosts,
            user_id: user[Math.floor(Math.random() * user.length)].id,
        });
    }

    process.exit(0);
};

seedDatabase();
