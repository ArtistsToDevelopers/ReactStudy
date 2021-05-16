import React from 'react'
import qs from 'qs'

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true // 문자열 맨 앞의 ?를 ignore
  })
  const detail = query.detail === 'true' // 쿼리의 파싱 결과 값은 문자열

  return (
    <div>
      <h1>소개</h1>
      <p>리액트 라우터 기초 프로젝트입니다.</p>
      { detail && <p>추가적인 정보가 어쩌고 저쩌고.. </p>}
    </div>
  )
}

export default About