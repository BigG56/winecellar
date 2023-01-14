import axios from 'axios';

export default axios.create({
  baseURL: '/home',
  timeout: 1000,
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json"
  }
});