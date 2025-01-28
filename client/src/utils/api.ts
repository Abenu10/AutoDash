export const API_URL = import.meta.env.VITE_API_URL || 'https://autodash.onrender.com/api';

export const endpoints = {
    dealers: `${API_URL}/dealers`,
    stats: `${API_URL}/stats`,
    inventory: `${API_URL}/inventory`,
    // Add more endpoints as needed
};
