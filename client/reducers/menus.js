import { SELECT_MENU } from "../actions/posts";

const initialState = {
    menuList: [
        {
            'title': 'About',
            'titleForDesign': 'whoami',
            'submenuList': [
                {
                    'title': 'now',
                    'content': 'blah blah'
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
    selectedMenuIdx: 0,
    selectedSubmenuIdx: 0,
};

export default (state=initialState, action) => {
    switch(action) {
        case SELECT_MENU:
            return { ...state, selectedMenuIdx: action.menuIdx };
        default:
            return initialState;
    }
}

