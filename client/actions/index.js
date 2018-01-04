import * as posts from './posts';
import * as menus from './menus';

/*********/
/* posts */
/*********/
const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

export function fetchPosts(url, belongToMajor, belongToMinor) {
    const request = fetch(url + "/" + belongToMajor + "/" + belongToMinor, {
        method: 'get',
        headers: headers
    }).then(res => res.json());

    return {
        type: posts.FETCH_POSTS,
        payload: request,
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
    const request = fetch(url + '/' + postId, {
        method: 'get',
        headers: headers
    }).then(res => res.json());

    return {
        type: posts.FETCH_POST,
        payload: request,
    }
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