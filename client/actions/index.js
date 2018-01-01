import * as posts from './posts';
import * as menus from './menus';

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};
export function fetchPosts(url) {
    const request = fetch(url, {
        method: 'get',
        headers: headers
    }).then(res => res.json());

    return {
        type: posts.FETCH_POSTS,
        payload: request
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
        payload: request
    }
}

export function changeMenu(menuIdx, level) {
    return {
        type: menus.CHANGE_MENU,
        menuIdx: menuIdx,
        level: level,
    };
}
