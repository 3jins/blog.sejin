import express from 'express';
import * as PostDao from '../mongoDB/dao/PostDao';
import { isEmpty } from '../../utils/nullChecker';

const router = express.Router();

router.get('/:nav/:subnav?', (req, res) => {
  const isPageValid = (page) => {
    if (!page) return false; // should not be undefined, null, 0
    const pageNumberForm = Number(page);
    if (Number.isNaN(pageNumberForm)) return false; // should be a number
    if (pageNumberForm % 1 !== 0) return false; // should be an integer
    if (pageNumberForm < 1) return false; // should be a natural number
    return true;
  };

  const { nav, subnav } = req.params;
  const { tag, page } = req.query;
  const pageScale = 10; // TODO(3jins): Reduce the scale in the mobile view
  const findQuery = {
    belongToMajor: nav,
  };
  const sortJson = nav === 'About' ? 'postNo' : { postNo: -1 };

  if (!isEmpty(subnav)) {
    findQuery.belongToMinor = subnav;
  }
  if (!isEmpty(tag)) {
    findQuery.tags = { $all: [tag] };
  }

  return PostDao.countPosts(findQuery)
    .then(numPosts => PostDao.findPost(findQuery)
      .skip(isPageValid(page) ? (page - 1) * pageScale : 0) // pagination
      .limit(pageScale) // Get 10 posts.
      .sort(sortJson)
      .then(posts => res.json({
        posts,
        numPosts,
      }))
      .catch((err) => {
        console.error(err);
        return res.status(500).json({
          message: `Could not retrieve ${subnav}`,
        });
      }));
});

export default router;
