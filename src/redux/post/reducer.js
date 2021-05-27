import { produce } from 'immer';
import * as types from './types';

const initialState = {
  loading: false,
  posts: [],
  errors: {},
};

const postsReducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      case types.FETCH_POSTS:
        draft.loading = true;
        break;
      case types.FETCH_POSTS_SUCCESS:
        draft.errors = {};
        draft.loading = false;
        draft.posts = action.payload;
        break;
      case types.FETCH_POSTS_FAILURE:
        draft.errors = action.payload;
        draft.loading = false;
        break;
      default:
        break;
    }
  });

export default postsReducer;
