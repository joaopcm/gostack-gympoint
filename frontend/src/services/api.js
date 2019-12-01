import axios from 'axios';

const api = axios.create({
  baseURL: 'http://6bff69f7.ngrok.io',
});

export default api;
