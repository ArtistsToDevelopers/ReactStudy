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
      dispatch({ type: ERROR, payload: e, error: true})
    }
  }
}