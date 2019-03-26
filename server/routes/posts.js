import express from 'express';
import {Post} from '../mongoDB/models';
import {isEmpty} from "../../utils/nullChecker";

const router = express.Router();

router.get('/:nav/:subnav?', function (req, res) {
    const nav = req.params.nav;
    const subnav = req.params.subnav;
    const tag = req.query.tag;
    const page = req.query.page;
    const pageScale = 10;
    const findJson = {
        "belongToMajor": nav,
    };
    const sortJson = nav === 'About' ? "postNo" : {"postNo": -1};

    if (!isEmpty(subnav)) {
        findJson["belongToMinor"] = subnav;
    }
    if (!isEmpty(tag)) {
        findJson["tags"] = {$all: [tag]};
    }

    Post
        .find(findJson)
        .skip((page - 1) * pageScale)   //
        .limit(pageScale)               // Get 10 posts.
        .sort(sortJson)
        .exec(function (err, posts) {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    message: 'Could not retrieve works'
                });
            }

            if (nav === 'About') {
                res.json({
                    posts: posts,
                });
            }
            else {
                Post
                    .find(findJson)
                    .count()    // Get total number of posts.
                    .exec((err, numPosts) => {
                        if (err) {
                            console.log(err);
                            return res.status(500).json({
                                message: 'Could not retrieve works'
                            });
                        }
                        res.json({
                            posts: posts,
                            numPosts: numPosts,
                        });

                    });
            }
        });

});

export default router;