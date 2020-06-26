const router = require('express').Router();
const slugify = require('slugify')
const Category = require('../models/category');


router.get('', async (req, res) => {
  try {
    const categories = await Category.find();
    res.json({ categories })
  } catch (error) {
    res.json(error);
  }
});

router.post('', async (req, res) => {
  try {
    const body = req.body;
    body.slug = slugify(body.title)
    const category = new Category(body);
    await category.save();
    res.json({ category })
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);
    res.json({ category })
  } catch (error) {
    res.json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(id, req.body, {new: true});
    res.json({ category })
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    Category.findByIdAndDelete(id, (err) => {
      if(err) res.json(error);

      res.json({ delete: true })
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;