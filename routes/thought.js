const express = require('express');
const router = express.Router();
const { Thought, User } = require('../models');

// /api/thoughts
router.get('/api/thoughts', async (req, res) => {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/api/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findById(req.params.id).populate('reactions');
    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/api/thoughts', async (req, res) => {
  try {
    const thought = await Thought.create(req.body);

    // Push the created thought's _id to the associated user's thoughts array field
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $push: { thoughts: thought._id } },
      { new: true }
    );

    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/api/thoughts/:id', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/api/thoughts/:id', async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.id);

    // Remove thought's id from the associated user's thoughts array
    if (deletedThought) {
      await User.findByIdAndUpdate(
        deletedThought.userId,
        { $pull: { thoughts: deletedThought._id } },
        { new: true }
      );
    }

    res.json(deletedThought);
  } catch (err) {
    res.status(500).json(err);
  }
});

// /api/thoughts/:thoughtId/reactions
router.post('/api/thoughts/:thoughtId/reactions', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $push: { reactions: req.body } },
      { new: true }
    );

    res.status(201).json(thought);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/api/thoughts/:thoughtId/reactions/:reactionId', async (req, res) => {
  try {
    const thought = await Thought.findByIdAndUpdate(
      req.params.thoughtId,
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    res.json(thought);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
