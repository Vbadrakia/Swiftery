// API Base URL - change based on environment
const API_BASE = 
  window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://swiftery-backend.onrender.com'; // Replace with your actual Render URL after deployment

window.API_BASE = API_BASE;
