const router = require('express').Router();
const { User, BlogPosts, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async(req, res) => {
    try {
        const commentData = await BlogPosts.findAll({
            include: [{ model: User }],
        });
        
        const comments = commentData.map(comment => comment.toJSON());
        res.status(200).render('/', { comments });

    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            ...req.body,
            user_id: req.session.user_id,
            comment: req.body.comment,
            blog_id: req.body.blog_id,
        });

        res.status(200).json(newComment);
    } catch (err) {
        res.status(400).json(err);
        console.error(err);
    }
});

module.exports = router;