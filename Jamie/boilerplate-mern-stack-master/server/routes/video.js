const express = require('express');
const router = express.Router();
// const { Video } = require("../models/Video");
const { auth } = require("../middleware/auth");
const multer = require("multer");
const ffmpeg = require("fluent-ffmpeg");

//=================================
//             video
//=================================

// Storage Multer Config
let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    if (ext !== '.mp4') {
      return cb(response.status(400).end('only mp4 is allowed'), false);
    }
    cb(null, true);
  }
})

const upload = multer({ storage: storage }).single("file");
router.post('/uploadfiles', (req, res) => {
  // 클라이언트에서 받은 비디오를 서버에 저장
  // npm install multer --save / save 키워드는 package.json 파일에 저장되게 하기 위함
  upload(req, res, error => {
    if (error) {
      return res.json({ success: false, error })
    }
    return res.json({ success: true, url: res.req.file.path, fileName: res.req.file.filename })
  })

})

router.post('/thumbnail', (req, res) => {
  // 썸네일 생성 후 비디오 러닝타임도 가져오기
  let filePath = "";
  let fileDuration = "";
  // 비디오 정보 가져오기
  ffmpeg.ffprobe(req.body.url, function(err, metadata) {
    console.log(req.body.url);
    console.dir(metadata) // all metadata
    console.log(metadata.format.duration)
    fileDuration = metadata.format.duration
  });

  // 썸네일 생성
  ffmpeg(req.body.url)
  .on('filenames', function(filenames) {
    console.log('will generate ' + filenames.join(', '));
    console.log(filenames);

    filePath = "uploads/thumbnails/" + filenames[0];
  })
  .on('end', function() {
    console.log('screenshots taken');
    return res.json({ success: true, url: filePath, fileDuration: fileDuration })
  })
  .on('error', function(err) {
    console.error(err);
    return res.json({ success: false, err});
  })
  .screenshots({
    count: 3,
    folder: 'uploads/thumbnails',
    size: '320x240',
    filename: 'thumbnail-%b.png'
  })
})


module.exports = router; 