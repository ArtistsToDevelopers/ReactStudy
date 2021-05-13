import React from 'react'
import styled from 'styled-components'

const TodoHeadBlock = styled.div`
  padding-top: 48px;
  padding-left: 32px;
  padding-right: 32px;
  padding-bottom: 24px;
  border-bottom: 1px solid #e9ecef;
  /* 일일이 컴포넌트를 만드는 대신 일반 HTML 태그 사용 + CSS Selector 사용하여 스타일링 */
  h1 {
    margin: 0;
    font-size: 36px;
    color: #343a40;
  }

  .day {
    margin-top: 4px;
    color: #868e96;
    font-size: 21px;
  }

  .tasks-left {
    color: #20c997;
    font-size: 18px;
    margin-top: 40px;
    font-weight: bold;
  }
`;

function TodoHead() {
  return (
    <TodoHeadBlock>
      <h1>2021년 5월 13일</h1>
      <div className='day'>목요일</div>
      <div className='tasks-left'>할 일 2개 남음</div>
    </TodoHeadBlock>
  )
}

export default TodoHead
