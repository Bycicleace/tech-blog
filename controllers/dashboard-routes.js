const router = require('express').Router();
const { Post, User, Comment } = require('../models');
const withAuth = require('../utils/auth.js');

router.get('/', withAuth, (req, res) => {
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

router.get('/new-post', withAuth, (req, res) => {
    res.render('new-post', {
        loggedIn: req.session.loggedIn
    });
});

router.get('/post/:id', withAuth, (req, res) => {
    Post.findOne({
        where: {
            id: req.params.id
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
        if(!dbPostData) {
            res.status(404).json({ message: "No post found with this id." });
            return;
        }
        
        const post = dbPostData.get({ plain: true });
        res.render('edit-post', {
            post,
            loggedIn: req.session.loggedIn
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
module.exports = router;