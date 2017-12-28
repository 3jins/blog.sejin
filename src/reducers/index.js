import { combineReducers } from 'redux';
import menuExchanger from './menuExchanger';
import scroller from './scroller';


const reducers = combineReducers({
    menuExchanger, scroller
});

export default reducers;