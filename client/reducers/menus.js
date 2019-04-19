import {
  CHANGE_MENU,
  CHANGE_SUBMENU,
  CHANGE_MENU_FINISHED,
} from '../actions/menus';

const initialState = {
  menuActionType: '',
  selectedMenuIdx: 0,
  selectedSubmenuIdx: 0,
  scroll: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
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
      };
    case CHANGE_MENU_FINISHED:
      return {
        ...state,
        menuActionType: action.type,
        scroll: false,
      };
    default:
      return state;
  }
};
