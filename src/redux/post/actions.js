import { createReduxActions } from 'utils/reduxActions';
import * as types from './types';

export const [fetchPosts, fetchPostsSuccess, fetchPostsFailure] = createReduxActions(
  types.FETCH_POSTS,
);
