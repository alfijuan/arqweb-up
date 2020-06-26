const router = require('express').Router();

const Lesson = require('../models/lesson');

router.get('', async (req, res) => {
  try {
    const lessons = await Lesson.find();
    res.json({ lessons })
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findById(id);
    res.json({ lesson })
  } catch (error) {
    res.json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const lesson = await Lesson.findByIdAndUpdate(id, req.body, {new: true});
    res.json({ lesson })
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    Lesson.findByIdAndDelete(id, (err) => {
      if(err) res.json(error);

      res.json({ delete: true })
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;