import * as posts from './posts';
import * as menus from './menus';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};


/*********/
/* posts */
/*********/
export function fetchPosts(url, belongToMajor, belongToMinor) {
    const postList = fetch(url + "/" + belongToMajor + "/" + belongToMinor, {
        method: 'get',
        headers: headers
    })
        .then(res => res.json())
        .catch(err => console.log(err));

    return {
        type: posts.FETCH_POSTS,
        loading: true,
        postList: postList,
    };
}

export function fetchPostsSuccess(postList) {
    return {
        type: posts.FETCH_POSTS_SUCCESS,
        loading: false,
        postList: postList,
    }
}

export function createPost(jsonData) {
    // const request = fetch('/create_post', {
    //     method: 'post',
    //     headers: headers,
    //     body: JSON.stringify(jsonData),
    // })
    //     .then(res => console.log(res))
    //     .catch(err => console.log(err));
}

export function fetchPost(url, postId) {
    // const request = fetch(url + '/' + postId, {
    //     method: 'get',
    //     headers: headers
    // }).then(res => res.json());
    //
    // return {
    //     type: posts.FETCH_POST,
    //     payload: request,
    // }
}

/*********/
/* menus */
/*********/
export function changeMenu(menuIdx) {
    return {
        type: menus.CHANGE_MENU,
        menuIdx: menuIdx,
    };
}

export function changeSubmenu(submenuIdx) {
    return {
        type: menus.CHANGE_SUBMENU,
        submenuIdx: submenuIdx,
    };
}