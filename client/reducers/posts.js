import { FETCH_POSTS, FETCH_POST } from "../actions/posts";

const initialState = {
    postsList: [],
    currentPost: {},
    createdPost: {},
    deletedPost: {},
};

export default (state=initialState, action) => {
    switch(action) {
        case FETCH_POSTS:
            return { ...state, postsList: {postsList: action.payload} };
        case FETCH_POST:
            return { ...state, currentPost: {postsList: action.payload} };
        default:
            return initialState;
    }
}

