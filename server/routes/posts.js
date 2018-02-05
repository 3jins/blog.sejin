import express from 'express';
import { Post } from '../db/models';
const router = express.Router();

router.get('/:nav/:subnav?', function(req, res) {
    const nav = req.params.nav;
    const subnav = req.params.subnav;
    const queryJson = {
        "belongToMajor": nav,
    };

    if(typeof subnav !== 'undefined') {
        queryJson["belongToMinor"] = subnav;
    }
    switch(nav) {
        case 'About':
            Post
                .find(queryJson)
                .sort('dateCreated')
                .exec(function (err, posts) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: 'Could not retrieve works'
                        });
                    }
                    res.json(posts);
                });
            break;
        case 'Works':
        case 'Blog':
            Post
                .find(queryJson)
                .sort({'dateCreated': -1})
                .exec(function (err, posts) {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            message: 'Could not retrieve works'
                        });
                    }
                    res.json(posts);
                });
            break;

    }
});

export default router;