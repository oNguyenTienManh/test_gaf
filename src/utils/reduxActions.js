import { createAction } from 'redux-actions';

const [REQUEST_SUFFIX, SUCCESS_SUFFIX, FAIL_SUFFIX] = [
  'REQUEST',
  'REQUEST_SUCCESS',
  'REQUEST_FAILURE',
];

function createActionTypes(type) {
  return [`${type}_${REQUEST_SUFFIX}`, `${type}_${SUCCESS_SUFFIX}`, `${type}_${FAIL_SUFFIX}`];
}

function createReduxAction(type) {
  return createAction(type);
}

function createReduxActions(type) {
  return [
    createAction(`${type}`),
    createAction(`${type}_SUCCESS`),
    createAction(`${type}_FAILURE`),
  ];
}

export { createReduxAction, createReduxActions, createActionTypes };
