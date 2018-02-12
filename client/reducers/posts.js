import {FETCH_POSTS, FETCH_POST, FETCH_TAGS, FETCH_SUCCESS} from "../actions/posts";

const initialState = {
    postActionType: 'FETCH_POSTS',
    postPayload: [],
    tagPayload: [],
    loading: false,
};

export default (state=initialState, action) => {
    switch(action.type) {
        case FETCH_POSTS:
            return {
                ...state,
                postActionType: action.type,
                // postPayload: action.postPayload,
                loading: action.loading,
            };
        case FETCH_POST:
            return {
                ...state,
                postActionType: action.type,
                // postPayload: action.postPayload,
                loading: action.loading,
            };
        case FETCH_TAGS:
            return {
                ...state,
                // tagPayload: action.tagPayload,
                loading: action.loading,
            };
            break;
        case FETCH_SUCCESS:
            return {
                ...state,
                postPayload: action.postPayload,
                tagPayload: action.tagPayload,
                loading: action.loading,
            };
        default:
            return initialState;
    }
};