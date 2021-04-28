import React, { useEffect, useState } from 'react';
import { Row, Col, List, Avatar } from 'antd'
import axios from 'axios'
import SideVideo from './Sections/SideVideo'
import Subscribe from './Sections/Subscribe'

function VideoDetailPage(props) {

  const videoId = props.match.params.videoId; // App.js에서 url에 담겨져있기 때문에 가져올 수 있음
  const variable = { videoId: videoId }

  const [videoDetail, setVideoDetail] = useState([]);

  useEffect(() => {
    axios.post('/api/video/getVideoDetail', variable) // 왜 post인지..?
      .then(response => {
        if (response.data.success) {
          setVideoDetail(response.data.videoDetail)
        } else {
          alert('비디오 정보 가져오기 실패');
        }
      })
  }, [])

  if (videoDetail.writer) {
    return (
      <Row gutter={[16, 16]}>
        <Col lg={18} xs={24}>

          <div style={{ width: '100%', padding: '3rem 4rem' }}>
            <video style={{ width: '100%' }} src={`http://localhost:5000/${videoDetail.filePath}`} controls />
            <List.Item
              actions={[<Subscribe userTo={videoDetail.writer._id} userFrom={localStorage.getItem('userId')} />]}>
              <List.Item.Meta
                avatar={<Avatar src={videoDetail.writer.image} />} // populate했기 때문에 가져올 수 있다.
                title={videoDetail.writer.name}
                description={videoDetail.description}
              />
            </List.Item>

            {/* comments */}

          </div>


        </Col>
        <Col lg={6} xs={24}>
          <SideVideo />
        </Col>
      </Row>
    )
  } else {
    return (
      <div>loading...</div>
    )
  }

}

export default VideoDetailPage