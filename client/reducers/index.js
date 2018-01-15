import { combineReducers } from 'redux';
import posts from './posts';
import menus from './menus';
import scrolls from './scrolls';

const reducers = combineReducers({
    posts, menus, scrolls,
});

export default reducers;