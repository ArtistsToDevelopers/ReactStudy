import * as postsAPI from '../api/posts' // /api/posts 안의 함수 모두 불러오기
import {
  // createPromiseThunk,
  // createPromiseThunkById,
  reducerUtils,
  handleAsyncActions,
  handleAsyncActionsById,
  createPromiseSaga,
  createPromiseSagaById
} from '../lib/asyncUtils'
import { takeEvery, getContext } from 'redux-saga/effects'

/* action type */
// post 여러 개 조회하기
const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

// post 하나 조회하기
const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';
const GO_TO_HOME = 'GO_TO_HOME'

export const getPosts = () => ({ type: GET_POSTS })
// payload는 파라미터 용도, meta는 리듀서에서 id를 알기 위한 용도
export const getPost = id => ({ type: GET_POST, payload: id, meta: id })
export const goToHome = () => ({ type: GO_TO_HOME })

const getPostsSaga = createPromiseSaga(GET_POSTS, postsAPI.getPosts)
const getPostSaga = createPromiseSagaById(GET_POST, postsAPI.getPostById)

function* goToHomeSaga() {
  const history = yield getContext('history')
  history.push('/')
}

// saga들을 합친다.
export function* postsSaga() {
  yield takeEvery(GET_POSTS, getPostsSaga)
  yield takeEvery(GET_POST, getPostSaga)
  yield takeEvery(GO_TO_HOME, goToHomeSaga)
}

// initial() 함수를 사용하여 리팩토링
const initialState = {
  posts: reducerUtils.initial(),
  post: {}
}

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      return handleAsyncActions(GET_POSTS, 'posts', true)(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActionsById(GET_POST, 'post')(state, action);
    default:
      return state;
  }
}