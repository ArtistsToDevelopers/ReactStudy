import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getPost, goToHome } from '../modules/posts'
import Post from '../components/Post'

const PostContainer = ({ postId }) => { // postId는 라우트의 URL 파라미터에서 읽어옴
  const { data, loading, error } = useSelector(
    state => state.posts.post[postId] || {
      loading: false,
      data: null,
      error: null
    }) // 데이터가 아예 존재하지 않을 수도 있으므로 비구조화 할당이 오류나지 않도록 처리
  const dispatch = useDispatch();

  useEffect(() => {
    if (data) return // 포스트가 존재하면 아예 요청 X
    dispatch(
      getPost(postId)
    )
  }, [postId, dispatch, data])

  if (loading) return <div>loading...</div>
  if (error) return <div>error occured</div>
  if (!data) return null

  return (
    <>
      <button onClick={() => dispatch(goToHome())}>홈으로 이동</button>
      <Post post={data} />
    </>
  )
}

export default PostContainer