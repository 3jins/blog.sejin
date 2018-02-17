import express from 'express';
import { Tag } from '../db/models';
const router = express.Router();

router.get('/:subnav', function(req, res) {
    const subnav = req.params.subnav;
    let tags = [];
    if(subnav === "") {
        tags = Tag.find();
    }
    else {
        tags = Tag.find({"belongToMinor": subnav});
    }
    tags.exec(function (err, tags) {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: 'Could not retrieve tags of ' + subnav
            });
        }
        res.json(tags);
    });
});

export default router;