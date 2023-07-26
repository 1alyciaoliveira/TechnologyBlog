const router = require('express').Router();
const { User, BlogPosts, Comment } = require('./../models'); 
const withAuth = require('./../utils/auth');

router.get('/editBlogs/:id', async(req, res) => {
    try {
        const blogData = await BlogPosts.findByPk (req.params.id);

        if (!blogData) {
            res.status(404).json({ message: 'No blog found with this id!' });
            return;
        }
        const blog = blogData.get({ plain: true });
        res.render('editBlogs', {
            ...blog,
            loggedIn: true
    });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;