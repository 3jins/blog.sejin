import {
  FETCH_POSTS,
  FETCH_POST,
  FETCH_TAGS,
  FETCH_SUCCESS,
} from '../actions/posts';

const initialState = {
  postActionType: 'FETCH_POSTS',
  postPayload: {},
  tagPayload: [],
  isLoaded: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case FETCH_POSTS:
      return {
        ...state,
        postActionType: action.type,
      };
    case FETCH_POST:
      return {
        ...state,
        postActionType: action.type,
      };
    case FETCH_TAGS:
      return {
        ...state,
        postActionType: action.type,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        postActionType: action.type,
        isLoaded: action.isLoaded,
        postPayload: action.postPayload,
        tagPayload: action.tagPayload,
      };
    default:
      return initialState;
  }
};
