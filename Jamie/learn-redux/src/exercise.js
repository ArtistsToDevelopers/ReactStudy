import { createStore } from 'redux'

// store를 만드는 함수

/* redux에서 관리할 상태 정의 */
const initialState = {
  counter: 0,
  text: '',
  list: []
}

/* action type 정의 */
const INCREASE = 'INCREASE'
const DECREASE = 'DECREASE'
const CHANGE_TEXT = 'CHANGE_TEXT'
const ADD_TO_LIST = 'ADD_TO_LIST'

/* 액션 생성 함수 정의 */
const increase = () => ({
  type: INCREASE
})

const decrease = () => ({
  type: DECREASE
})

const changeText = text => ({
  type: CHANGE_TEXT,
  text
})

const addToList = item => ({
  type: ADD_TO_LIST,
  item
})

/* reducer 만들기 */
function reducer(state = initialState, action) {
  switch (action.type) {
    case INCREASE:
      return {
        ...state,
        counter: state.counter + 1
      }
    case DECREASE:
      return {
        ...state,
        counter: state.counter - 1
      }
    case CHANGE_TEXT:
      return {
        ...state,
        text: action.text
      }
    case ADD_TO_LIST:
      return {
        ...state,
        list: state.list.concat(action.item)
      }
    default:
      return state
  }
}

/* 스토어 만들기 */
const store = createStore(reducer)
console.log(store.getState())

// store 안에 있는 상태가 바뀔 때마다 호출되는 listener 함수
const listener = () => {
  const state = store.getState()
  console.log(state)
}

// 구독을 해제하고 싶을 때는 unsubscribe 호출
const unsubscribe = store.subscribe(listener);

store.dispatch(increase())
store.dispatch(decrease())
store.dispatch(changeText('안녕하세요'))
store.dispatch(addToList({ id: 1, text: 'wow' }))
