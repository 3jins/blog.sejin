import { CHANGE_MENU } from "../actions/menus";

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
};

// const extractMenu = (wholeMenuData) => {
//     const menuLength = wholeMenuData.menuList.length;
//     let menuList = new Array(wholeMenuData.menuList.length);
//     for(let i=0; i<menuLength; i++) {
//         menuList[i] = {
//             'title': wholeMenuData.menuList[i].title,
//         }
//     }
//     return menuList;
// };
//
// const extractSubMenu = (wholeMenuData, selectedMenuIdx) => {
//     return wholeMenuData.menuList[selectedMenuIdx].submenuList;
// };
//
// const initialState = {
//     selectedMenuIdx: 0,
//     selectedSubmenuIdx: 0,
//     menuList: extractMenu(wholeMenuData),
//     titleForDesign: wholeMenuData.menuList[0].titleForDesign,
//     submenuList: extractSubMenu(wholeMenuData, 0),
// };

export default (state, action) => {
    switch(action.type) {
        case CHANGE_MENU:
            const menuIdx = action.menuIdx;
            switch(action.level) {
                case 0:
                    return {
                        ...state,
                        selectedMenuIdx: menuIdx,
                    };
                    break;
                case 1:
                    return {
                        ...state,
                        selectedSubmenuIdx: menuIdx,
                    };
                    break;
                default:
                    return {
                        ...state,
                        selectedMenuIdx: menuIdx,
                    };
                    break;
            }
        default:
            return initialState;
    }
}

