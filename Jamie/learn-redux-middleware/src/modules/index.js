import { combineReducers } from 'redux'
import counter, { counterSaga } from './counter'
import posts from './posts'
import { all } from 'redux-saga/effects'

const rootReducer = combineReducers({
  counter,
  posts
})

export function* rootSaga() {
  yield all([counterSaga()]); // 배열 안의 여러 saga를 동시에 실행
}

export default rootReducer