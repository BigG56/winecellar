import axios from 'axios';

export default axios.create({
  baseURL: '/home',
  withCredentials: true,
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json"
  }
});