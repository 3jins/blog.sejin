import * as posts from './posts';
import * as menus from './menus';
import * as scrolls from './scrolls';
import {getBasePx, getMenuHeightRaw, emToPx} from "../../utils/unitConverter";
import {isEmpty} from "../../utils/nullChecker";

const headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
};

/*********
 * posts *
 *********/
export function fetchPosts(url, belongToMajor, belongToMinor, tag, page) {
    let request = url + "/" + belongToMajor + "/" + belongToMinor;
    if (isEmpty(page)) page = 1;
    if (isEmpty(tag)) {
        request = url + "/" + belongToMajor + "/" + belongToMinor + "?page=" + page;
    }
    else {
        request = url + "/" + belongToMajor + "/" + belongToMinor + "?tag=" + tag + "&page=" + page;
    }
    const postPayload = fetch(request, {
        method: 'get',
        headers: headers,
    })
        .then(res => res.json())
        .catch(err => console.log(err));
    return {
        type: posts.FETCH_POSTS,
        loading: true,
        postPayload: postPayload,
    };
}

export function fetchPost(url, postNo) {
    console.log(url + '/' + postNo);
    const postPayload = fetch(url + '/' + postNo, {
        method: 'get',
        headers: headers
    })
        .then(res => res.json())
        .catch(err => console.log(err));

    return {
        type: posts.FETCH_POST,
        // loading: true,
        postPayload: postPayload,
    }
}

export function fetchTags(url, belongToMinor) {
    console.log(url + "/" + belongToMinor);
    const tagPayload = fetch(url + "/" + belongToMinor, {
        method: 'get',
        headers: headers
    })
        .then(res => res.json())
        .catch(err => console.log(err));

    return {
        type: posts.FETCH_TAGS,
        // areTagsLoading: true,
        tagPayload: tagPayload,
    };
}

export function fetchCommentsCount(url) {
    const domain = "http://enhanced.kr";
    // https://graph.facebook.com/v2.4/?fields=share{comment_count}&id=http://enhanced.kr/postviewer/121
    const graphAPI = "https://graph.facebook.com/v2.4/?fields=share{comment_count}&id=";
    const commentsCountPayload = fetch(graphAPI + domain + url, {
        method: 'get',
        headers: headers
    })
        .then(res => res.json())
        .catch(err => console.log(err));

    return {
        type: posts.FETCH_COMMENTS_COUNT,
        loading: true,
        commentsCountPayload: commentsCountPayload,
    };
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

export function fetchSuccess(postPayload, tagPayload = [], commentsCountPayload = []) {
    return {
        type: posts.FETCH_SUCCESS,
        loading: false,
        postPayload: postPayload,
        tagPayload: tagPayload,
        commentsCountPayload: commentsCountPayload,
    };
}


/*********
 * menus *
 *********/
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

export function changeMenuFinished() {
    return {
        type: menus.CHANGE_MENU_FINISHED,
    };
}

/***********
 * scrolls *
 ***********/
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