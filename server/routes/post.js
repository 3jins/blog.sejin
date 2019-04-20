import express from 'express';
import * as PostDao from '../mongoDB/dao/PostDao';

const router = express.Router();

router.get('/:postNo', (req, res) => {
  const { postNo } = req.params;
  const findQuery = {
    postNo,
  };

  return PostDao.findPost(findQuery)
    .then(posts => res.json({
      posts,
    }))
    .catch((err) => {
      console.error(err);
      return res.status(500).json({
        message: `Could not retrieve a post (postNo: ${postNo})`,
      });
    });
});

export default router;
