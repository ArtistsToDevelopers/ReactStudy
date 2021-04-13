import React from 'react';

const Hello = ({color, name, isSpecial}) => {
    return (
        <div style={{color}}>
            {/* { isSpecial ? <b>*</b> : null } */}
            { isSpecial && <b>*</b> }
            안녕하세요 {name}
        </div>
    );
};

Hello.defaultProps = {
    name: '이름 없음',
    color: '#666'
}

export default Hello;