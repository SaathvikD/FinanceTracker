import axios from 'axios';

const API_BASE_URL = 'http://your-backend-url.com';

export const getExpenses = async (token) => {
    return axios.get(`${API_BASE_URL}/expenses`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};