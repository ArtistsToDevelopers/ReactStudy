import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { FaCode } from "react-icons/fa";
import { Typography, Avatar, Card, Input, Icon, Row, Col } from 'antd';
import moment from 'moment';
const { Title } = Typography;
const { Meta } = Card;

function LandingPage() {
  const [video, setVideo] = useState([]);

  useEffect(() => {
    axios.get('/api/video/getVideos')
      .then(response => {
        if (response.data.success) {
          console.log(response.data);
          setVideo(response.data.videos);
        } else {
          alert('getVideos failed');
        }
      })
  }, []) // DOM이 최초에 렌더링될 때 업데이트

  const renderCards = video.map((video, index) => {
    // 초로 되어 있는 duration을 분:초로 변환
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor((video.duration - minutes * 60));

    return <Col lg={6} md={8} xs={24}>
      <div style={{ position: 'relative' }}>
        <a href={`/video/${video._id}`}>
          <img style={{ width: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt="" />
          <div className="duration">
            <span>{minutes} : {seconds}</span>
          </div>
        </a>
      </div>
      <br />
      <Meta
        avatar={
          <Avatar src={video.writer.image} />
        }
        title={video.title}
        description=""
      />
      <span>{video.writer.name} </span><br />
      <span style={{ marginLeft: '3rem' }}>{video.views} views</span> - <span>{moment(video.createdAt).format("MMM Do YY")}</span>
    </Col>

  })
  return (
    <div style={{ width: '85%', margin: '3rem auto' }} >
      <Title level={2}> Recommended </Title>
      <hr />
      <Row gutter={[32, 16]}>
        {renderCards}

      </Row>
    </div>
  )
}

export default LandingPage
