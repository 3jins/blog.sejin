import express from 'express';
import { Post } from '../mongoDB/models';
const router = express.Router();

router.get('/:postNo', function(req, res) {
    const postNo = req.params.postNo;
    const queryJson = {
        "postNo": postNo,
    };

    Post
        .find(queryJson)
        .exec(function (err, post) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Could not retrieve works'
                });
            }
            res.json({post: post});
        });
});

export default router;