import express from 'express';
import * as TagDao from '../mongoDB/dao/TagDao';

const router = express.Router();

router.get('/:subnav', (req, res) => {
  const { subnav } = req.params;
  const findQuery = subnav === '' ? {} : { belongToMinorList: { $all: [subnav] } };

  return TagDao.findTag(findQuery)
    .sort({ tagName: 1 })
    .then(tags => res.json(tags))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: `Could not retrieve tags of ${subnav}`,
      });
    });
});

export default router;
