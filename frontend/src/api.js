import axios from 'axios';

// Base URL for your Backend
const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export default API;