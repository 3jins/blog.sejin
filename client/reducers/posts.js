import {
    FETCH_POSTS, FETCH_POST, FETCH_TAGS, FETCH_COMMENTS_COUNT, FETCH_SUCCESS,
} from "../actions/posts";

const initialState = {
    postActionType: 'FETCH_POSTS',
    postPayload: {},
    tagPayload: [],
    commentsCountPayload: [],
    loading: false,
};

export default (state=initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                postActionType: action.type,
                loading: action.loading,
            };
        case FETCH_POST:
            return {
                ...state,
                postActionType: action.type,
                loading: action.loading,
            };
        case FETCH_TAGS:
            return {
                ...state,
                loading: action.loading,
            };
            break;
        case FETCH_COMMENTS_COUNT:
            return {
                ...state,
                loading: action.loading,
            };
        case FETCH_SUCCESS:
            return {
                ...state,
                postPayload: action.postPayload,
                tagPayload: action.tagPayload,
                commentsCountPayload: action.commentsCountPayload,
                loading: action.loading,
            };
        default:
            return initialState;
    }
};