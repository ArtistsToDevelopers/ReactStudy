import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Subscribe = ({ userTo, userFrom }) => {
  const [subscribeNumber, setSubscribeNumber] = useState(0);
  const [subscribed, setSubscribed] = useState(false);

  useEffect(() => {
    let variable = { userTo: userTo };
    axios.post('/api/subscribe/subscribeNumber', variable)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.subscribeNumber)
          setSubscribeNumber(response.data.subscribeNumber)
        } else {
          alert('구독자 정보 받아오기 실패');
        }
      });

      let subscribedVariable = { userTo: userTo, userFrom: localStorage.getItem('userId') }
    
    // 구독 여부 판단하기
    axios.post('/api/subscribe/subscribed', subscribedVariable)
    .then(response => {
      if (response.data.success) {
        setSubscribed(response.data.subscribed);
      } else {
        alert('정보를 받아오지 못했습니다!');
      }
    })
  }, [])

  const onSubscribe = () => {
    let subscribeVariable = {
      userTo: userTo,
      userFrom: userFrom
    }
    // 이미 구독중이라면
    if (subscribed) {
      axios.post('/api/subscribe/unsubscribe', subscribeVariable)
      .then(response => {
        if (response.data.success) {
          setSubscribeNumber(subscribeNumber === 0 ? 0 : subscribeNumber - 1);
          setSubscribed(!subscribed)
        } else {
          alert('구독 취소 실패');
        }
      })
    } else {
      axios.post('/api/subscribe/subscribe', subscribeVariable)
      .then(response => {
        if (response.data.success) {
          setSubscribeNumber(subscribeNumber + 1);
          setSubscribed(!subscribed)
        } else {
          alert('구독 실패');
        }
      })
    }
  }

  return (
    <div>
      <button
        style={{
          backgroundColor: `${subscribed ? '#AAAAAA' : '#CC0000' }`,
          borderRadius: '4px',
          color: 'white',
          padding: '10px 16px',
          fontWeight: '500',
          fontSize: '1rem',
          textTransform: 'uppercase'
        }}
        onClick={onSubscribe}
      >
        {subscribeNumber} {subscribed ? 'Subscribed' : 'Subscribe' }
      </button>
    </div>
  )
}

export default Subscribe