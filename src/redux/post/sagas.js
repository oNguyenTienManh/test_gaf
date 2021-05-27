import { postServices } from 'services';
import { takeLatest, call, put } from 'redux-saga/effects';

import * as types from './types';
import { fetchPostsSuccess, fetchPostsFailure } from './actions';

export function* getPosts({ payload }) {
  try {
    const { data } = yield call(postServices.getPosts, payload);
    yield put(fetchPostsSuccess(data));
  } catch (error) {
    yield put(fetchPostsFailure(error));
  }
}

export function* postsSagas() {
  yield takeLatest(types.FETCH_POSTS, getPosts);
}
