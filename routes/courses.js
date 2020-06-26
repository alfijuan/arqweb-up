const router = require('express').Router();

const Course = require('../models/course');
const Lesson = require('../models/lesson');


router.get('', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json({ courses })
  } catch (error) {
    res.json(error);
  }
});

router.post('', async (req, res) => {
  try {
    const course = new Course(req.body);
    await course.save();
    res.json({ course })
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('lessons');
    res.json({ course })
  } catch (error) {
    res.json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findByIdAndUpdate(id, req.body, {new: true});
    res.json({ course })
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    Course.findByIdAndDelete(id, (err) => {
      if(err) res.json(error);

      res.json({ delete: true })
    });
  } catch (error) {
    res.json(error);
  }
});


// ==========
// Lessons
// ==========


router.post('/:id/lessons', async (req, res) => {
  try {
    const lesson = new Lesson(req.body);
    await lesson.save();
    const { id } = req.params;
    await Course.findByIdAndUpdate(id, { $push: { lessons: lesson._id } });
    res.json({ lesson })
  } catch (error) {
    res.json(error);
  }
});

// router.delete('/:id/lessons/:lessonId', async (req, res) => {
//   try {
//     const { id, lessonId } = req.params;
//     Lesson.findByIdAndDelete(lessonId, (err) => {
//       if(err) res.json(error);
//       console.log('HEREEE NO ERROR')

//       await Course.findByIdAndUpdate(id, { $pull: { lessons: lessonId } });
//       res.json({ delete: true })
//     });
//   } catch (error) {
//     res.json(error);
//   }
// });

module.exports = router;