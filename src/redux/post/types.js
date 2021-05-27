import { createActionTypes } from 'utils/reduxActions';

export const context = 'post';

export const [FETCH_POSTS, FETCH_POSTS_SUCCESS, FETCH_POSTS_FAILURE] = createActionTypes(
  `${context}/FETCH_POSTS`,
);
