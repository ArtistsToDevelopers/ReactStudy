import React, { useState, useEffect } from 'react';
import axios from 'axios'

function SideVideo() {
  const [sideVideos, setSideVideos] = useState([]);
  // DB에서 모든 비디오 불러오기
  useEffect(() => {
    axios.get('/api/video/getVideos')
      .then(response => {
        if (response.data.success) {
          console.log(response.data);
          setSideVideos(response.data.videos);
        } else {
          alert('getVideos failed');
        }
      })
  }, []) // DOM이 최초에 렌더링될 때 업데이트
  
  const renderSideVideos = sideVideos.map((video, index) => {

    // 초로 되어 있는 duration을 분:초로 변환
    let minutes = Math.floor(video.duration / 60);
    let seconds = Math.floor((video.duration - minutes * 60));

    return (
    <a href={`/video/${video._id}`}>
      <div key={index} style={{display: 'flex', marginBottom: '1rem', padding: '0 2rem'}}>
        <div style={{width: '40%', marginRight: '1rem'}}>
            <img style={{width: '100%', height: '100%'}} src={`http://localhost:5000/${video.thumbnail}`} />
        </div>
        
        <div style={{width: '50%'}}>
          <a href='/' style={{ color: 'gray'}}>
            <span style={{fontSize: '1rem', color: 'black'}}> {video.title}</span><br/>
            <span>{video.writer.name}</span><br/>
            <span>{video.views}</span><br/>
            <span>{minutes} : {seconds}</span><br/>
          </a>
        </div>
      </div>
    </a>
    )
  })
  return (
    <React.Fragment>
      <div style={{marginTop: '3rem'}}>
      {renderSideVideos}
      </div>
    </React.Fragment>
  )
  
}

export default SideVideo