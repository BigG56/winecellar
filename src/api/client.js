import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:6000',
  timeout: 1000,
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json"
  }
});