import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:5000/client',
  tiemeout: 1000,
  headers: {
    "Accept": "application/json",
    "Content-type": "application/json"
  }
});