import React from 'react'
import { NavLink, Route } from 'react-router-dom'
import Profile from './Profile'
import WithRouterSample from './WithRouterSample'

const Profiles = () => {
  return (
    <div>
      <h3>유저 목록</h3>
      <ul>
        <li>
          <NavLink to='/profiles/jamie'
            activeStyle={{ background: 'black', color: 'white' }}>
            Jamie
          </NavLink>
        </li>
        <li>
          <NavLink to='/profiles/diana'
            activeStyle={{ background: 'black', color: 'white' }}>
            Diana
          </NavLink>
        </li>
      </ul>
      <Route exact path='/profiles' render={() => <div>유저를 선택해주세요.</div>} />
      <Route path='/profiles/:username' component={Profile} />
      <WithRouterSample />
    </div>
  )
}

export default Profiles
