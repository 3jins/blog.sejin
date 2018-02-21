import express from 'express';
import { Post } from '../db/models';
const router = express.Router();

router.get('/:nav/:subnav?', function(req, res) {
    const nav = req.params.nav;
    const subnav = req.params.subnav;
    const findJson = {
        "belongToMajor": nav,
    };
    const sortJson = nav === 'About' ? "dateCreated" : {"dateCreated": -1};

    if(typeof subnav !== 'undefined') {
        findJson["belongToMinor"] = subnav;
    }
    Post
        .find(findJson)
        .sort(sortJson)
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