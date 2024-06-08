import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users/';

const getProfile = async () => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const response = await axios.get(API_URL + 'profile', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  getProfile,
};
