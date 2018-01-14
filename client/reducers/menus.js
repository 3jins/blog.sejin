import { CHANGE_MENU, CHANGE_SUBMENU } from "../actions/menus";

const initialState = {
    selectedMenuIdx: 0,
    selectedSubmenuIdx: 0,
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
        {
            'title': 'Contacts',
            'titleForDesign': 'echo hello >> ~/mailbox.txt',
            'submenuList': [
                {
                    'title': 'email',
                },
                {
                    'title': 'github',
                },
                {
                    'title': 'facebook',
                },
                {
                    'title': 'linkedin',
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
            };
        default:
            return state;
    }
}

