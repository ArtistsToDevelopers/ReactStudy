import React, { useEffect, useState } from 'react';
import axios from 'axios';

const [SideVideos, setSideVideos] = useState([]);
// 여기에 에러가 있다고 하는데 대체 무엇이 문제인지 모르겠음


useEffect(() => {
    axios.get('/api/video/getVideos')
    .then(response => {
        if(response.data.success) {
            console.log(response.data);
            setSideVideos(response.data.videos);
        } else {
            alert('비디오 가져오기를 실패했습니다.')
        }
    })
}, [])

const renderSideVideo = SideVideos.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor((video.duration - minutes * 60));  

    return (
        <div key={index} style={{ display: 'flex', marginBottom: '1rem', padding: '0 rem' }}>
            <div style={{width: '40%', marginRight: '1rem'}}>
                <a href>
                    <img style={{ width: '100%', height: '100%' }} src={`http://localhost:5000/${video.thumbnail}`} alt='thumbnail' />
                </a>
            </div>
            <div style={{width: '50%' }}>
                <a href={`/video/${video._id}`} style={{ color:'gray' }}>
                    <span style={{ fontSize: '1rem', color: 'black' }}>{video.title}</span><br />
                    <span>{video.writer.name}</span><br />
                    <span>{video.views} views</span><br />
                    <span>{minutes} : {seconds}</span>
                </a>
            </div>
        </div>
    )
});

function SideVideo() {
    return (
            <React.Fragment>
                {renderSideVideo}
            </React.Fragment> 
    )
}

export default SideVideo
