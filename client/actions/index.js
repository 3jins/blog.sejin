import * as posts from './posts';
import * as menus from './menus';
import * as scrolls from './scrolls';
import { getBasePx, getMenuHeightRaw, emToPx } from '../../utils/unitConverter';
import { isEmpty } from '../../utils/nullChecker';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json',
};

/* ******* *
 *  posts  *
 * ******* */
const fetchPosts = (url, belongToMajor, belongToMinor, tag, page) => {
  const ret = { type: posts.FETCH_POSTS };
  const request = [url, belongToMajor, belongToMinor].join('/');
  if (isEmpty(page)) page = 1;
  const option = `?page=${page}${isEmpty(tag) ? '' : `&tag=${tag.replace(/&/g, '%26').replace(/\+/g, '%2B')}`}`;

  ret.postPayload = fetch(request + option, {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .catch(err => console.error(err));

  return ret;
};

const fetchPost = (url, postNo) => {
  const ret = { type: posts.FETCH_POST };
  const request = [url, postNo].join('/');

  ret.postPayload = fetch(request, {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .catch(err => console.error(err));

  return ret;
};

const fetchTags = (url, belongToMinor) => {
  const ret = { type: posts.FETCH_TAGS };
  const request = [url, belongToMinor].join('/');

  ret.tagPayload = fetch(request, {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .catch(err => console.error(err));

  return ret;
};

const fetchCommentsCount = (urls) => {
  const ret = { type: posts.FETCH_COMMENTS_COUNT };
  const graphAPI = 'https://graph.facebook.com/v2.4/?fields=share{comment_count}&ids=';
  const request = graphAPI + urls.join(',');

  ret.commentsCountPayload = fetch(request, {
    method: 'get',
    headers,
  })
    .then(res => res.json())
    .catch(err => console.error(err));

  return ret;
};

// const createPost = (jsonData) => {
//   const request = fetch('/create_post', {
//     method: 'post',
//     headers: headers,
//     body: JSON.stringify(jsonData),
//   })
//     .then(res => console.log(res))
//     .catch(err => console.error(err));
// };

const fetchSuccess = (postPayload, tagPayload = [], commentsCountPayload = []) => ({
  type: posts.FETCH_SUCCESS,
  isLoaded: true,
  postPayload,
  tagPayload,
  commentsCountPayload,
});


/* ******* *
 *  menus  *
 * ******* */
const changeMenu = menuIdx => ({
  type: menus.CHANGE_MENU,
  menuIdx,
});

const changeSubmenu = submenuIdx => ({
  type: menus.CHANGE_SUBMENU,
  submenuIdx,
});

const changeMenuFinished = () => ({
  type: menus.CHANGE_MENU_FINISHED,
});

/* ********* *
 *  scrolls  *
 * ********* */
const scroll = (scrollY, innerWindowHeight) => {
  const basePx = getBasePx().menu;
  const menuHeight = getMenuHeightRaw();
  const menuPadding = menuHeight / 4;
  const areNavsSticky = {
    isNavSticky: scrollY >= emToPx(basePx, menuPadding),
    isSubnavSticky: scrollY >= innerWindowHeight - emToPx(basePx, menuHeight + menuPadding),
  };
  return {
    type: scrolls.SCROLL,
    areNavsSticky,
  };
};

export {
  fetchPosts,
  fetchPost,
  fetchTags,
  fetchCommentsCount,
  fetchSuccess,
  changeMenu,
  changeSubmenu,
  changeMenuFinished,
  scroll,
};
