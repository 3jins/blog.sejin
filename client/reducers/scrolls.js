import { SCROLL } from "../actions/scrolls";

const initialState = {
    areNavsSticky: {
        isNavSticky: false,
        isSubnavSticky: false,
    },
};

export default (state=initialState, action) => {
    switch(action.type) {
        case SCROLL:
            return {
                ...state,
                areNavsSticky: action.areNavsSticky,
            };
        default:
            return state;
    }
}

