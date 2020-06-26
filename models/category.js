const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  title: {type: String, required: true},
  slug: {type: String, unique: true},
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course"
    }
  ]
});

module.exports = mongoose.model('Category', CategorySchema);