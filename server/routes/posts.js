import express from 'express';
import mongoose from 'mongoose';
import { Post } from '../db/models';
// import timestamps from 'mongoose-timestamp';
const router = express.Router();

router.get('(about)?', function(req, res) {
    Post
        .find({
            "belongToMajor": "About",
        })
        .exec(function(err, posts) {
            if(err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Could not retrieve works'
                });
            }
            // res.json(posts);
            res.json({test: "test"});
            // res.format({
            //     html: function(){
            //         res.send(express.static(__dirname + "/../public"));
            //     },
            //     json: function(){
            //         res.send(posts);
            //     },
            // });
        });
});


export default router;