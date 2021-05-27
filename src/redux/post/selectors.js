import { createSelector } from 'reselect';

const selectPostsStore = (state) => state.posts;

export const selectLoading = createSelector([selectPostsStore], (posts) => posts.loading);

export const selectPosts = createSelector([selectPostsStore], (posts) => posts.posts);
