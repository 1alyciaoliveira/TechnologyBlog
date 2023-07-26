const router = require('express').Router();
const { User, BlogPosts, Comment } = require('./../models'); 
const withAuth = require('./../utils/auth');

router.get('/', async(req, res) => {
    try {
        const blogData = await BlogPosts.findAll({
            include: [
                { model: User, 
                  attributes: ['username'],
                },
            ],
    });
        const blogs = blogData.map((blog) => blog.get({ plain: true }));

        res.render('homepage', {
            blogs,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/blogs/:id', async(req, res) => {
    try {
        const blogData = await BlogPosts.findByPk(req.params.id, {
            include: [
                { 
                    model: Comment,
                    include: User,
                },
                User,
            ],
        });

        const blog = blogData.get({ plain: true });

        res.render('blog', {
            ...blog,
            logged_in: req.session.logged_in
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/dashboard', withAuth, async(req, res) => {
    try {
        const userData = await User.findByPk(req.session.user_id, {
            include: [{ model: BlogPosts }],
        });

        const user = userData.get({ plain: true });

        res.render('dashboard', {
            ...user,
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/signup', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
        res.render('signup');
});

router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        res.redirect('/dashboard');
        return;
    }
        res.render('login');
});

module.exports = router;