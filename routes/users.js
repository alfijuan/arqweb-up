const router = require('express').Router();

const User = require('../models/user');

// Users
router.get('', async (req, res) => {
  try {
    const users = await User.find();
    res.json({ users })
  } catch (error) {
    res.json(error);
  }
});

router.post('', async (req, res) => {
  try {
    const user = new User(req.body);
    await user.save();
    res.json({ user })
  } catch (error) {
    res.json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json({ user })
  } catch (error) {
    res.json(error);
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByIdAndUpdate(id, req.body, {new: true});
    res.json({ user })
  } catch (error) {
    res.json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    User.findByIdAndDelete(id, (err) => {
      if(err) res.json(error);

      res.json({ delete: true })
    });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;