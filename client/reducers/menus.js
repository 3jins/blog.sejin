import { SELECT_MENU } from "../actions/posts";

const initialState = {
    menuList: [
        {
            'title': 'About',
            'titleForDesign': 'whoami',
        },
        {
            'title': 'Works',
            'titleForDesign': 'ls works',
        },
        {
            'title': 'Blog',
            'titleForDesign': 'ls posts',
        },
        {
            'title': 'Contacts',
            'titleForDesign': 'echo hello >> ~/mailbox.txt'
        },
    ],
    selectedMenuIdx: 0,
};

export default (state=initialState, action) => {
    switch(action) {
        case SELECT_MENU:
            return { ...state, selectedMenuIdx: action.menuIdx };
        default:
            return initialState;
    }
}

