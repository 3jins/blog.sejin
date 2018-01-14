import express from 'express';
import { Post } from '../db/models';
// import timestamps from 'mongoose-timestamp';
const router = express.Router();

router.get('/:nav', function(req, res) {
    const nav = req.params.nav;
    Post
        .find({
            "belongToMajor": nav,
        })
        .exec(function(err, posts) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Could not retrieve works'
                });
            }
            res.json(posts);
        });
});


export default router;