import React, { Fragment, useState, useEffect } from 'react'
import SingleComment from './SingleComment'

function ReplyComment({ refreshFunction, commentsList, parentCommentId, postId }) {

  const [childCommentNumber, setChildCommentNumber] = useState(0);
  const [openReplyComment, setOpenReplyComment] = useState(false);

  useEffect(() => {
    let commentNumber = 0;
    commentsList.map((comment, index) => {
      if (comment.responseTo === parentCommentId) {
        commentNumber++;
      }
    })
    setChildCommentNumber(commentNumber);
  }, [commentsList])

  const renderReplyComment = (parentCommentId) => {
    return commentsList.map((comment, index) => (
      <Fragment>
        {
          comment.responseTo === parentCommentId &&
          <div style={{ width: '80%', marginLeft: '40px' }}>
            <SingleComment key={index} refreshFunction={refreshFunction} comment={comment} postId={postId} />
            <ReplyComment refreshFunction={refreshFunction} commentsList={commentsList} parentCommentId={comment._id} postId={postId} />
          </div>
        }
      </Fragment>
    ))
  }

  const onHandleChange = () => {
    setOpenReplyComment(!openReplyComment);
  }

  return (
    <div>

      { childCommentNumber > 0 &&
        <p style={{ fontSize: '14px', margin: 0, color: 'gray' }} onClick={onHandleChange}>
          View {childCommentNumber} more comment(s)
        </p>
      }

      { openReplyComment &&
        renderReplyComment(parentCommentId)
      }

    </div>
  )
}

export default ReplyComment
