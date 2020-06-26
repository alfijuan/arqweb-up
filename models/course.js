const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CourseSchema = new Schema({
  title: {type: String, required: true},
  subtitle: String,
  description: String,
  new: {type: Boolean, default: false},
  categories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category"
    }
  ],
  lessons: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lesson"
    }
  ]
});

module.exports = mongoose.model('Course', CourseSchema);