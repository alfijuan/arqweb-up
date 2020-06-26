const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LessonSchema = new Schema({
  title: {type: String, required: true},
  subtitle: String,
  video_url: {type: String, required: true},
  completed: Boolean
});

module.exports = mongoose.model('Lesson', LessonSchema);