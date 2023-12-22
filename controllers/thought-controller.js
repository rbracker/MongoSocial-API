const Thought = require('../models/thought');
async function getAllThoughts(req, res) {
  try {
    const thoughts = await Thought.find();
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function getThoughtById(req, res) {
  const thoughtId = req.params.id;
  try {
    const thought = await Thought.findById(thoughtId);
    res.json(thought);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  getAllThoughts,
  getThoughtById,
};
