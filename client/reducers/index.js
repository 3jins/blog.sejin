import { combineReducers } from 'redux';
import posts from './posts';
import menus from './menus';

const reducers = combineReducers({
    posts, menus,
});

export default reducers;