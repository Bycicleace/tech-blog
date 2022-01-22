const router = require('express').Router();
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    Post.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'body',
            'created_at',
        ],
        include: [
            {
                model: User,
                attributes: ['username']
            },
            {
                model: Comment,
                attributes: ['body'],
                include: {
                    model: User,
                    attributes: ['username']
                }
            }
        ]
    })
    .then(dbPostData => {
        const posts = dbPostData.map(post => post.get({ plain: true }));
        res.render('dashboard', {
            posts,
            loggedIn: req.session.loggedIn
        });
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/new-post', (req, res) => {
    res.render('new-post', {
        loggedIn: req.session.loggedIn
    });
});

module.exports = router;