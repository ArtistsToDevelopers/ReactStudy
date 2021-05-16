import React from 'react'

const profileData = {
  jamie: {
    name: '이지현',
    description: '신입 개발자'
  },
  diana: {
    name: '김다연',
    description: '컴포자이너스 대표님'
  }
}

const Profile = ({ match }) => {
  // parameter를 받아올 때는 match 안에 들어 있는 params 값을 참조한다.
  const { username } = match.params
  const profile = profileData[username]

  if (!profile) {
    return <div>존재하지 않는 유저입니다.</div>
  }
  return (
    <div>
      <h3>
        {username}({profile.name})
      </h3>
      <p>{profile.description}</p>
    </div>
  )
}

export default Profile
