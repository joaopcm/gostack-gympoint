import axios from 'axios';

const api = axios.create({
  baseURL: 'http://fa207587.ngrok.io/',
});

export default api;
