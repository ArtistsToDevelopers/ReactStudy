import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Counter from '../components/Counter'
import { increase, decrease, setDiff } from '../modules/counter'

const CounterContainer = () => {
  // useSelector: redux store의 상태 조회
  // state의 값은 store.getState() 함수를 호출했을 때 나타나는 결과물과 동일
  const number = useSelector(state => state.counter.number)
  const diff = useSelector(state => state.counter.diff)

  // useDispatch: redux store의 dispatch를 함수에서 사용할 수 있게 해주는 hook
  const dispatch = useDispatch();
  const onIncrease = () => dispatch(increase())
  const onDecrease = () => dispatch(decrease())
  const onSetDiff = diff => dispatch(setDiff(diff));

  return (
    <Counter
      number={number}
      diff={diff}
      onIncrease={onIncrease}
      onDecrease={onDecrease}
      onSetDiff={onSetDiff}
    />
  )
}

export default CounterContainer
