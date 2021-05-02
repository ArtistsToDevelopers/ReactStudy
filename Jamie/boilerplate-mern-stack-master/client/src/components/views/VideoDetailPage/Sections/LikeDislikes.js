import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd'
import axios from 'axios'

function LikeDislikes({ videoId, userId, commentId }) {

  const [variable, setVariable] = useState({})
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  if (videoId) {
    setVariable({ videoId: videoId, userId: userId })
  } else {
    setVariable({ commentId: commentId, userId: userId })
  }

  useEffect(() => {
    axios.post('/api/like/getLikes', variable)
      .then(response => {
        if (response.data.success) {
          // 얼마나 많은 좋아요를 받았는가
          setLikes(response.data.likes.length)
          // 내가 이미 좋아요를 눌렀는지
          response.data.likes.map(like => {
            if (like.userId === userId) {
              setLikeAction('liked')
            }
          })
        } else {
          alert('like 정보 가져오기 실패')
        }
      })

    axios.post('/api/like/getDislikes'. variable)
      .then(response => {
        if (response.data.success) {
          setDislikes(response.data.dislikes.length)

          response.data.dislikes.map(dislike => {
            if (dislike.userId === userId) {
              setDislikeAction('disliked')
            }
          })
        } else {
          alert('dislike 정보 가져오기 실패')
        }
      })
  }, [])

  return (
    <div>
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          <Icon type='like' 
          theme={likeAction === 'liked' ? 'filled' : 'outlined'} />
        </Tooltip>

        <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {likes} </span>
      </span>

      <span key='comment-basic-dislike'>
        <Tooltip title='Dislike'>
          <Icon type='dislike' 
          theme={dislikeAction === 'disliked' ? 'filled' : 'outlined'} />
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {dislikes} </span>
      </span>
    </div>
  )
}

export default LikeDislikes
