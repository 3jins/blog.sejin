import { CHANGE_MENU, CHANGE_SUBMENU, CHANGE_SUBMENU_FINISHED } from "../actions/menus";

const initialState = {
    selectedMenuIdx: 0,
    selectedSubmenuIdx: 0,
    scroll: false,
    menuList: [
        {
            'title': 'About',
            'titleForDesign': 'whoami',
            'submenuList': [
                {
                    'title': 'now',
                },
                {
                    'title': 'vision',
                },
                {
                    'title': 'history',
                },
            ],
        },
        {
            'title': 'Works',
            'titleForDesign': 'ls works',
            'submenuList': [
                {
                    'title': 'web',
                },
                {
                    'title': 'mobile',
                },
                {
                    'title': 'artificial int',
                },
                {
                    'title': 'etc',
                },
            ],
        },
        {
            'title': 'Blog',
            'titleForDesign': 'ls works',
            'submenuList': [
                {
                    'title': 'tech',
                },
                {
                    'title': 'life',
                },
                {
                    'title': 'etc',
                },
            ],
        },
    ],
};

export default (state=initialState, action) => {
    switch(action.type) {
        case CHANGE_MENU:
            return {
                ...state,
                selectedMenuIdx: action.menuIdx,
            };
        case CHANGE_SUBMENU:
            return {
                ...state,
                selectedSubmenuIdx: action.submenuIdx,
                scroll: true,
            };
        case CHANGE_SUBMENU_FINISHED:
            return {
                ...state,
                scroll: false,
            };
        default:
            return state;
    }
}

