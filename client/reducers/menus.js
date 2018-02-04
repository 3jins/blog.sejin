import {CHANGE_MENU, CHANGE_SUBMENU, EXCHANGE_PREVIEWS, CHANGE_MENU_FINISHED} from "../actions/menus";

const initialState = {
    menuActionType: '',
    selectedMenuIdx: 0,
    selectedSubmenuIdx: 0,
    scroll: false,
    exchange: false,
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
                    'title': 'a.i.',
                },
                {
                    'title': 'etc',
                },
            ],
        },
        {
            'title': 'Blog',
            'titleForDesign': 'ls posts',
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
                menuActionType: action.type,
                selectedMenuIdx: action.menuIdx,
                selectedSubmenuIdx: 0,
                scroll: true,
            };
        case CHANGE_SUBMENU:
            return {
                ...state,
                menuActionType: action.type,
                selectedSubmenuIdx: action.submenuIdx,
                scroll: true,
                exchange: action.exchange,
            };
        case CHANGE_MENU_FINISHED:
            return {
                ...state,
                menuActionType: action.type,
                scroll: false,
                exchange: false
            };
        default:
            return state;
    }
}

