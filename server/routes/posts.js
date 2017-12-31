import express from 'express';
import mongoose from 'mongoose';
import { Post } from '../db/models';
// import timestamps from 'mongoose-timestamp';
const router = express.Router();

router.get('/works', function(req, res) {
    Post
        .find({"belongToMajor": 'works'})
        .exec(function(err, posts) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Could not retrieve posts'
                });
            }
            res.json(posts);
        });
});
router.get('/blog', function(req, res) {
    Post
        .find({"belongToMajor": 'blog'})
        .exec(function(err, posts) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Could not retrieve posts'
                });
            }
            res.json(posts);
        });
});

export default router;