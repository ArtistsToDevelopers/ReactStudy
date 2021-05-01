import React, { useState } from 'react'
import axios from 'axios'
import { useSelector } from 'react-redux'
import SingleComment from './SingleComment'

function Comment({ refreshFunction, commentsList, postId }) {
  const videoId = postId; // App.js에서 url에 담겨져있기 때문에 가져올 수 있음

  const user = useSelector(state => state.user);

  const [commentValue, setCommentValue] = useState("");

  const handleChange = (event) => {
    setCommentValue(event.currentTarget.value)
  }

  const onSubmit = (e) => {
    e.preventDefault()

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId
    }

    axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if (response.data.success) {
          refreshFunction(response.data.result)
          setCommentValue("")
        } else {
          alert('코멘트 작성 실패!')
        }
      })
  }

  return (
    <div>
      <br />
      <p> Replies</p>
      <hr />

      {/* Comment Lists */}
      {commentsList && commentsList.map((comment, index) => (
        (!comment.responseTo &&
          <SingleComment key={index} refreshFunction={refreshFunction} comment={comment} postId={videoId} />
        )

      ))}



      {/* Root Comment Form */}
      <form style={{ display: 'flex' }} onSubmit={onSubmit}>
        <textarea
          style={{ width: '100%', borderRadius: '5px' }}
          placeholder='코멘트를 작성해주세요.'
          value={commentValue}
          onChange={handleChange}
        />
        <br />
        <button style={{ width: '20%', height: '52px' }} onClick={onSubmit}>Submit</button>
      </form>
    </div>
  )
}

export default Comment
