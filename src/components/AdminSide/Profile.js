import React from 'react'

function Profile(props) {
  return (
    <div>
        <h1>Profile</h1>
        <div>{props.resultInfo.firstname}</div>
        <div>{props.resultInfo.lastname}</div>
    </div>
  )
}

export default Profile