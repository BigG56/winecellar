import API from './client';

// API interface for loading the user's profile
export const fetchUser = async (userId) => {
  try {
    const response = await API.get(`users/${userId}`);

    return response.data;

  } catch (err) {
    throw err.response.data;
  }
}

// API interface for updating the user's profile
export const updateUser = async (userName) => {
  try {
    const response = await API.post(`users/${userName}`, data);

    return response.data;

  } catch(err) {
    throw err.response.data;
  }
}