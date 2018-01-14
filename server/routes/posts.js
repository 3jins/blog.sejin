import express from 'express';
import { Post } from '../db/models';
// import timestamps from 'mongoose-timestamp';
const router = express.Router();

router.get('/:nav/:subnav', function(req, res) {
    const nav = req.params.nav;
    const subnav = req.params.subnav;
    Post
        .find({
            "belongToMajor": nav,
            "belongToMinor": subnav,
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