import axios from 'axios';

const API_URL = 'http://localhost:5000/api/recommendations/';

const createRecommendation = async (data) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const response = await axios.post(API_URL, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getRecommendations = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export default {
  createRecommendation,
  getRecommendations,
};
