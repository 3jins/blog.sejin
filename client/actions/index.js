import * as posts from './posts';
import * as menus from './menus';
import * as scrolls from './scrolls';
import {getBasePx, getMenuHeightRaw, emToPx} from "../utils/unitConverter";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};


/*********/
/* posts */
/*********/
export function fetchPosts(url, belongToMajor, belongToMinor) {
    console.log(url + "/" + belongToMajor + "/" + belongToMinor);
    const postPayload = fetch(url + "/" + belongToMajor + "/" + belongToMinor, {
        method: 'get',
        headers: headers
    })
        .then(res => {
            // console.log(res);
            return res.json();
        })
        .catch(err => console.log(err));

    return {
        type: posts.FETCH_POSTS,
        loading: true,
        postPayload: postPayload,
    };
}

export function fetchPost(url, postId) {
    console.log(url + '/' + postId);
    const postPayload = fetch(url + '/' + postId, {
        method: 'get',
        headers: headers
    })
        .then(res => res.json())
        .catch(err => console.log(err));

    return {
        type: posts.FETCH_POST,
        loading: true,
        postPayload: postPayload,
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

export function fetchSuccess(postPayload) {
    return {
        type: posts.FETCH_SUCCESS,
        loading: false,
        postPayload: postPayload,
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

export function changeSubmenu(submenuIdx, exchange) {
    const changedState = {
        type: menus.CHANGE_SUBMENU,
        submenuIdx: submenuIdx,
        exchange: false,
    };
    if(exchange) {
        changedState['exchange'] = true;
    }
    return changedState;
}

export function changeMenuFinished() {
    return {
        type: menus.CHANGE_MENU_FINISHED,
    };
}

/***********/
/* scrolls */
/***********/
export function scroll(scrollY, innerWindowHeight) {
    const basePx = getBasePx()['menu'];
    const menuHeight = getMenuHeightRaw();
    const menuPadding = menuHeight / 4;
    const areNavsSticky = {
        isNavSticky: scrollY >= emToPx(basePx, menuPadding),
        isSubnavSticky: scrollY >= innerWindowHeight - emToPx(basePx, menuHeight + menuPadding),
    };
    return {
        type: scrolls.SCROLL,
        areNavsSticky: areNavsSticky,
    }
}