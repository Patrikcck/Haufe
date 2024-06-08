import React, { useEffect, useState } from 'react';
import RecommendationService from '../services/RecommendationService';

const Home = () => {
  const [recommendations, setRecommendations] = useState([]);
  const [newRecommendation, setNewRecommendation] = useState({
    title: '',
    message: '',
    watchedAt: '',
    rating: '',
    poster: '',
  });

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const data = await RecommendationService.getRecommendations();
        setRecommendations(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchRecommendations();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewRecommendation({ ...newRecommendation, [name]: value });
  };

  const handleCreateRecommendation = async (e) => {
    e.preventDefault();
    try {
      const created = await RecommendationService.createRecommendation(newRecommendation);
      setRecommendations([...recommendations, created]);
      setNewRecommendation({ title: '', message: '', watchedAt: '', rating: '', poster: '' });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="container">
      <div className="page">
        <h2>Recommendations</h2>
        <form onSubmit={handleCreateRecommendation}>
          <input
            type="text"
            name="title"
            value={newRecommendation.title}
            onChange={handleInputChange}
            placeholder="Title"
            required
          />
          <textarea
            name="message"
            value={newRecommendation.message}
            onChange={handleInputChange}
            placeholder="Message"
            required
          ></textarea>
          <input
            type="text"
            name="watchedAt"
            value={newRecommendation.watchedAt}
            onChange={handleInputChange}
            placeholder="Watched At"
            required
          />
          <input
            type="number"
            name="rating"
            value={newRecommendation.rating}
            onChange={handleInputChange}
            placeholder="Rating"
            required
          />
          <input
            type="text"
            name="poster"
            value={newRecommendation.poster}
            onChange={handleInputChange}
            placeholder="Poster URL"
            required
          />
          <button type="submit">Add Recommendation</button>
        </form>
        <ul>
          {recommendations.map((rec) => (
            <li key={rec._id}>
              <h3>{rec.title}</h3>
              <p>{rec.message}</p>
              <p>Watched at: {rec.watchedAt}</p>
              <p>Rating: {rec.rating}</p>
              {rec.poster && <img src={rec.poster} alt={rec.title} />}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Home;
