import * as types from '../actions/ActionTypes';

const initialState = {
    menuList: [
        {
            'navMenu': 'About',
            'contentMenu': ['Vision', 'History', 'Interests']
        },
        {
            'navMenu': 'Works',
            'contentMenu': ['Web', 'Mobile', 'AI', 'ETC']
        },
        {
            'navMenu': 'Blog',
            'contentMenu': []
        },
        {
            'navMenu': 'Contact',
            'contentMenu': []
        }
    ],
    selectedNavMenu: 0,
    selectedContentMenu: 0
};

export default function exchangeMenu(state=initialState, action, menuIdx) {
    /* ... */
    switch(action.type) {
        case types.CLICK_NAV_MENU:
            return {
                ...state,
                selectedNavMenu: menuIdx,
            };
        case types.CLICK_CONTENT_MENU:
            return {
                ...state,
                selectedContentMenu: menuIdx,
            };
        default:
            return state;
    }
}