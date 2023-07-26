const router = require('express').Router();
const { User, BlogPosts, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async(req, res) => {
    try {
        const postData = await BlogPosts.findAll({
            include: [{ model: User }],
        });
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});


router.post('/', withAuth, async (req, res) => {
    try {
        const newPost = await BlogPosts.create({
            ...req.body,
            user_id: req.session.user_id,
        });

        res.status(200).json(newPost);
    } catch (err) {
        res.status(400).json(err);
        console.error(err);
    }
});

router.put('/:id', withAuth, async(req, res) => {
    try {
        const postData = await BlogPosts.update(req.body, {
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData[0]) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, async(req, res) => {
    try {
        const postData = await BlogPosts.destroy({
            where: {
                id: req.params.id,
                user_id: req.session.user_id,
            },
        });

        if (!postData) {
            res.status(404).json({ message: 'No post found with this id!' });
            return;
        }

        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;