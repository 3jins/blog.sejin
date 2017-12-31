import * as types from './posts';

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
        type: FETCH_POSTS,
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
        type: FETCH_POST,
        payload: request
    }
}

export function changeMenu(menuIdx) {
    return {
        'menuIdx': menuIdx,
    };
}
