const menuBasePx = 14;
const contentBasePx = 16;
const menuHeight = 4;

function getBasePx() {
    return {
        'menu': menuBasePx,
        'content': contentBasePx,
    }
}

function getMenuHeight() {
    return menuHeight * menuBasePx;
}

function getMenuHeightRaw() {
    return menuHeight;
}

function emToPx(basePx, em) {
    return basePx * em;
}

export {getBasePx, getMenuHeight, getMenuHeightRaw, emToPx};