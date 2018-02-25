import express from 'express';
import { Post } from '../db/models';
const router = express.Router();

router.get('/:postNo', function(req, res) {
    const postNo = req.params.postNo;
    const queryJson = {
        "postNo": postNo,
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