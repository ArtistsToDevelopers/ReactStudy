// 리액트 컴포넌트 만들기

// 리액트 불러오기
import React from 'react';

function Hello({color, name, isSpecial}) {
    return <div style={{color}}>
        { isSpecial && <b>*</b> }
        Hello {name}!</div>
}

Hello.defaultProps = {
    name: '이름없음'
}

// Hello라는 컴포넌트를 내보낼거야
export default Hello;