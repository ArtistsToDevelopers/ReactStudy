import React, { useState } from 'react';
import { Typography, Button, Form, message, Input, Icon } from 'antd';
import Dropzone from 'react-dropzone'
import axios from 'axios';

const { Title } = Typography;
const { TextArea } = Input;

function VideoUploadPage() {

  const privateOptions = [
    { value: 0, label: 'Private' },
    { value: 1, label: 'Public' }
  ]

  const categoryOptions = [
    { value: 0, label: 'Film & Animation' },
    { value: 1, label: 'Autos & Vehicles' },
    { value: 2, label: 'Music' },
    { value: 3, label: 'Pets & Animals' }
  ]

  const [videoTitle, setVideoTitle] = useState("");
  const [description, setDescription] = useState("");
  const [privateYN, setPrivateYN] = useState(0);
  const [category, setCategory] = useState("Film & Animation");
  const [filePath, setFilePath] = useState("");
  const [duration, setDuration] = useState("");
  const [thumbnailPath, setThumbnailPath] = useState("");

  const onChangeTitle = (e) => {
    setVideoTitle(e.currentTarget.value);
  }

  const onChangeDescription = (e) => {
    setDescription(e.currentTarget.value);
  }

  const onPrivateYNChange = (e) => {
    setPrivateYN(e.currentTarget.value);
  }

  const onCategoryChange = (e) => {
    setCategory(e.currentTarget.value);
  }

  const onDrop = (files) => {
    let formData = new FormData();
    const config = {
      header: { 'content-type': 'multipart/form-data' }
    }
    formData.append("file", files[0]);

    axios.post('/api/video/uploadfiles', formData, config)
      .then(response => {
        if (response.data.success) {
          console.log(response.data);

          let variable = {
            url: response.data.url,
            fileName: response.data.fileName
          }

          setFilePath(response.data.url);

          axios.post('/api/video/thumbnail', variable)
            .then(response => {
              if (response.data.success) {
                console.log(response.data);
                setDuration(response.data.fileDuration);
                setThumbnailPath(response.data.url);

              } else {
                alert('썸네일 생성 실패');
              }
            })
        } else {
          alert('video upload failed');
        }
      })
  }
  return (
    <div style={{ maxWidth: '700px', margin: '2rem auto' }}>
      <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <Title level={2}>Upload Video</Title>
      </div>

      <Form>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Drop Zone */}
          <Dropzone
            onDrop={onDrop}
            multiple={false}
            maxSize={10000000000}>
            {({ getRootProps, getInputProps }) => (
              <div style={{
                width: '300px', height: '240px', border: '1px solid lightgray',
                alignItems: 'center', justifyContent: 'center'
              }} {...getRootProps()}>
                <input {...getInputProps()} />
                <Icon type="plus" style={{ fontSize: '3rem' }} />

              </div>
            )}
          </Dropzone>
          {/* Thumbnail */}
          {thumbnailPath &&
            <div>
              <img src={`http://localhost:5000/${thumbnailPath}`} alt="thumbnail" />
            </div>
          }


        </div>
        <br />
        <br />
        <label>Title</label>
        <Input
          onChange={onChangeTitle}
          value={videoTitle}
        />
        <br />
        <br />
        <label>Description</label>
        <TextArea
          onChange={onChangeDescription}
          value={description}
        />

        <br />
        <br />
        <select onChange={onPrivateYNChange}>
          {privateOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br />
        <br />
        <select onChange={onCategoryChange}>
          {categoryOptions.map((item, index) => (
            <option key={index} value={item.value}>{item.label}</option>
          ))}
        </select>

        <br />
        <br />
        <Button type="primary" size="large" onClick>
          Submit
        </Button>
      </Form>
    </div>
  )
}

export default VideoUploadPage