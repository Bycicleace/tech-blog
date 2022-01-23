const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

// POST New Comment
router.post('/', withAuth, (req, res) => {
    if (req.session) {
        Comment.create({
            body: req.body.body,
            post_id: req.body.post_id,
            user_id: req.session.user_id
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
    }
})

module.exports = router;