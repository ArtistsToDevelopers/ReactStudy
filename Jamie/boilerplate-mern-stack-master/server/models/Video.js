const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
  // 필드 정의
  writer: {
    type: mongoose.Schema.Types.ObjectId, // Id만 넣어도 User에 가서 해당 User의 모든 정보를 불러옴
    ref: 'User'
  },
  title: {
    type: String,
    maxLength: 50
  },
  description: {
    type: String
  },
  privacy: {
    type: Number
  },
  filePath: {
    type: String
  },
  category: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  duration: {
    type: String
  },
  thumbnail: {
    type: String
  }
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

module.exports = { Video }