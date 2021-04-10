import React, { useState } from 'react';
// 리액트 패키지에서 useState 함수를 불러와준다

const Counter = () => {
    const [number, setNumber] = useState(0);
    // useState를 사용할 때 기본값을 파라미터로 넣어서 호출한다
    // 이 함수를 호출하면 배열이 반환된다
    // 여기서 첫번째 원소는 현재 상태, 두번째 원소는 Setter(ex. setNumber) 함수이다

    const onIncrease = () => {
        // setNumber(number + 1);
        setNumber(prevNumber => prevNumber + 1);
    }
    const onDecrease = () => {
        // setNumber(number - 1);
        setNumber(prevNumber => prevNumber - 1);
        // 그 다음 상태를 파라미터로 넣어준것이 아니라, 값을 업데이트 하는 함수를 파라미터로 넣어주었습니다.
        // 함수형 업데이트는 주로 나중에 컴포넌트를 최적화를 하게 될 때 사용
    }
    // 배열 비구조화 할당을 통하여 각 원소를 추출
        // const numberState = useState(0);
        // const number = numberState[0];
        // const setNumber = numberState[1];
        // 원래는 위와 같이 해야 함
    
    return (
        <div>
            <h1>{number}</h1>
            <button onClick={onIncrease}>+1</button>
            <button onClick={onDecrease}>-1</button>
        </div>
    );
};

export default Counter;