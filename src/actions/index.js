import * as types from './ActionTypes';

export function clickNavMenu(menuIdx) {
    return {
        type: types.CLICK_NAV_MENU,
        menuIdx: menuIdx
    };
}

export function scroll() {
    return {
        type: types.SCROLL
    };
}

export function clickContentMenu(menuIdx) {
    return {
        type: types.CLICK_CONTENT_MENU,
        menuIdx: menuIdx
    };
}