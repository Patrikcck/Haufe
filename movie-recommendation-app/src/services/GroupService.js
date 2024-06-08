import axios from 'axios';

const API_URL = 'http://localhost:5000/api/groups/';

const createGroup = async (name) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const response = await axios.post(API_URL, { name }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const getGroups = async () => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const response = await axios.get(API_URL, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

const joinGroup = async (groupId) => {
  const token = JSON.parse(localStorage.getItem('user')).token;
  const response = await axios.post(API_URL + 'join', { groupId }, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

export default {
  createGroup,
  getGroups,
  joinGroup,
};