const Reaction = require('../models/reaction');

// Example methods
async function createReaction(req, res) {
  const { reactionBody, username } = req.body;
  try {
    const newReaction = await Reaction.create({ reactionBody, username });
    res.json(newReaction);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

async function deleteReaction(req, res) {
  const reactionId = req.params.id;
  try {
    await Reaction.findByIdAndDelete(reactionId);
    res.json({ message: 'Reaction deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports = {
  createReaction,
  deleteReaction,
};
