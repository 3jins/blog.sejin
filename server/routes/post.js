import express from 'express';
import { Post } from '../db/models';
const router = express.Router();

router.get('/:postId', function(req, res) {
    const postId = req.params.postId;
    const queryJson = {
        "postId": postId,
    };

    Post
        .find(queryJson)
        .exec(function (err, posts) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Could not retrieve works'
                });
            }
            res.json(posts);
        });
});

export default router;