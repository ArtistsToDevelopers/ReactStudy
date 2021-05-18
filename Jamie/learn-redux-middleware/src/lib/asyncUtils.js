// promise에 기반한 thunk 생성
export const createPromiseThunk = (type, promiseCreator) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

  // promiseCreator가 단 하나의 파라미터만 받는다는 전제 하에 작성
  // 여러 종류의 파라미터를 전달해야 하는 상황에서는 객체 타입의 파라미터를 받아오도록 함
  // ex) writeComment({ postId: 1, text: '댓글 내용' })

  return param => async dispatch => {
    dispatch({ type, param })
    try {
      // 결과물 이름을 payload로 통일
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload })
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true })
    }
  }
}

// reducer에서 사용할 수 있는 여러 유틸 함수들
export const reducerUtils = {
  // 초기 상태. 초기 data값은 기본적으로 Null이지만 바꿀 수도 있다.
  initial: (initialData = null) => ({
    loading: false,
    data: initialData,
    error: null
  }),
  // 로딩 중 상태. prevState의 경우에는 기본값은 null이지만
  // 따로 값을 지정하면 Null로 바꾸지 않고 다른 값을 유지시킬 수 있다.
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  // 성공 상태
  success: payload => ({
    loading: false,
    data: payload,
    error: null
  }),
  // 실패 상태
  error: error => ({
    loading: false,
    data: null,
    error: error
  })
}

// 비동기 관련 액션들을 처리하는 리듀서 생성
// type은 action.type, key는 상태의 key
export const handleAsyncActions = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading(keepData ? state[key].data : null)
        }
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        }
      default:
        return state
    }
  }
}

const defaultIdSelector = param => param;
export const createPromiseThunkById = (type, promiseCreator, idSelector = defaultIdSelector) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]

  return param => async dispatch => {
    const id = idSelector(param);
    dispatch({ type, meta: id })
    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload, meta: id })
    } catch (e) {
      dispatch({ type: ERROR, error: true, payload: e, meta: id })
    }
  }
}

// id별로 처리하는 유틸 함수
export const handleAsyncActionsById = (type, key, keepData = false) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`]
  return (state, action) => {
    const id = action.meta
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.loading(
              // state[key][id]가 만들어지지 않았을 수도 있으므로 유효성 검사 후 data 조회
              keepData ? state[key][id] && state[key][id].data : null
            )
          }
        }
      case SUCCESS:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.success(action.payload)
          }
        }
      case ERROR:
        return {
          ...state,
          [key]: {
            ...state[key],
            [id]: reducerUtils.error(action.payload)
          }
        }
      default:
        return state
    }
  }

}