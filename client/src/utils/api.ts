export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:7071/api';

export const endpoints = {
    dealers: `${API_URL}/dealers`,
    stats: `${API_URL}/stats`,
    inventory: `${API_URL}/inventory`,
    // Add more endpoints as needed
};
