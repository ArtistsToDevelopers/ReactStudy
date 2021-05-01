import React, { useState } from 'react'
import { Comment, Avatar, Button, Input } from 'antd'
import { useSelector } from 'react-redux'
import axios from 'axios'

function SingleComment({ refreshFunction, comment, postId }) {
  const user = useSelector(state => state.user);
  const [openReply, setOpenReply] = useState(false);
  const [commentValue, setCommentValue] = useState("");
  const videoId = postId;


  const handleChange = (e) => {
    setCommentValue(e.currentTarget.value);
  }

  const onClickReplyOpen = () => {
    setOpenReply(!openReply)
  }

  const onSubmit = (e) => {
    e.preventDefault();

    const variables = {
      content: commentValue,
      writer: user.userData._id,
      postId: videoId,
      responseTo: comment._id
    }

    axios.post('/api/comment/saveComment', variables)
      .then(response => {
        if (response.data.success) {
          console.log(response.data.result);
          refreshFunction(response.data.result)
          setCommentValue("")
          setOpenReply(false);
        } else {
          alert('코멘트 작성 실패!')
        }
      })
  }
  const actions = [
    <span onClick={onClickReplyOpen} key="comment-basic-reply-to"> Reply to</span>
  ]

  return (
    <div>
      <Comment
        actions={actions}
        author={comment.writer.name}
        avatar={<Avatar src={comment.writer.image} alt />}
        content={comment.content}
      />


      { openReply &&
        <form style={{ display: 'flex' }} onSubmit={onSubmit}>
          <textarea
            style={{ width: '100%', borderRadius: '5px' }}
            placeholder='코멘트를 작성해주세요.'
            value={commentValue}
            onChange={handleChange}
          />
          <br />
          <button style={{ width: '20%', height: '52px' }} onSubmit={onSubmit}>Submit</button>
        </form>
      }
    </div>
  )
}

export default SingleComment
