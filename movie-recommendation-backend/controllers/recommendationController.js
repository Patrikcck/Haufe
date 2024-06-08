const Recommendation = require('../models/Recommendation');

exports.createRecommendation = async (req, res) => {
  const { title, message, link, watchedAt, rating, poster } = req.body;
  try {
    const recommendation = new Recommendation({
      title,
      message,
      link,
      watchedAt,
      rating,
      poster,
      user: req.user.id,
    });
    await recommendation.save();
    res.status(201).json(recommendation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getRecommendations = async (req, res) => {
  try {
    const recommendations = await Recommendation.find().populate('user', 'username');
    res.status(200).json(recommendations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
