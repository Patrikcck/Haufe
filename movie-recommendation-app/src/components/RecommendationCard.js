import React from 'react';

const RecommendationCard = ({ recommendation }) => {
  return (
    <div className="recommendation-card">
      <img src={recommendation.poster} alt={recommendation.title} />
      <h2>{recommendation.title}</h2>
      <p>{recommendation.message}</p>
      <p>Rating: {recommendation.rating}</p>
      <a href={recommendation.link}>View more</a>
    </div>
  );
};

export default RecommendationCard;
