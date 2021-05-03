import React, { useEffect, useState } from 'react'
import { Tooltip, Icon } from 'antd'
import axios from 'axios'

function LikeDislikes({ videoId, userId, commentId }) {

  let variable = {}
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [likeAction, setLikeAction] = useState(null);
  const [dislikeAction, setDislikeAction] = useState(null);

  if (videoId) {
    variable = { videoId: videoId, userId: userId }
  } else {
    variable = { commentId: commentId, userId: userId }
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

    axios.post('/api/like/getDislikes'.variable)
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

  const onLike = () => {
    if (likeAction === null) {
      axios.post('/api/like/upLike', variable)
        .then(response => {
          if (response.data.success) {
            setLikes(likes + 1);
            setLikeAction('liked');

            if (dislikeAction !== null) {
              setDislikeAction(null);
              setDislikes(dislikes - 1);
            }

          } else {
            alert('like 올리기 실패')
          }
        })
    } else {
      axios.post('/api/like/unLike', variable)
        .then(response => {
          if (response.data.success) {
            setLikes(likes - 1);
            setLikeAction(null);
          } else {
            alert('unlike 실패');
          }
        })
    }
  }

  const onDislike = () => {
    if (dislikeAction !== null) {
      axios.post('/api/like/unDislike', variable)
        .then(response => {
          if (response.data.success) {
            setDislikes(dislikes - 1);
            setDislikeAction(null);
          } else {
            alert('undislike 실패');
          }
        })
    } else {
      axios.post('/api/like/upDislike', variable)
        .then(response => {
          if (response.data.success) {
            setDislikes(dislikes + 1);
            setDislikeAction('disliked')

            if (likeAction !== null) {
              setLikeAction(null);
              setLikes(likes - 1);
            }
          }
        })
    }
  }
  return (
    <div>
      <span key='comment-basic-like'>
        <Tooltip title='Like'>
          <Icon type='like'
            theme={likeAction === 'liked' ? 'filled' : 'outlined'}
            onClick={onLike} />
        </Tooltip>

        <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {likes} </span>
      </span>&nbsp;&nbsp;

      <span key='comment-basic-dislike'>
        <Tooltip title='Dislike'>
          <Icon type='dislike'
            theme={dislikeAction === 'disliked' ? 'filled' : 'outlined'} 
            onClick={onDislike}/>
        </Tooltip>
        <span style={{ paddingLeft: '8px', cursor: 'auto' }}> {dislikes} </span>
      </span>&nbsp;&nbsp;
    </div>
  )
}

export default LikeDislikes
