import {FETCH_POSTS, FETCH_POST, FETCH_POSTS_SUCCESS} from "../actions/posts";

const initialState = {
    postList: [],
    loading: false,
    currentPostIdx: 0,
};

export default (state=initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                postList: action.postList,
                loading: action.loading,
            };
        case FETCH_POSTS_SUCCESS:
            return {
                ...state,
                postList: action.postList,
                loading: action.loading,
            };
        // case FETCH_POST:
        //     return {
        //         ...state,
        //         currentPost: action.currentPost,
        //     };
        default:
            return initialState;
    }
}

