import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5033/api';

export const alertsApi = {
  getAlerts: async () => {
    const response = await axios.get(`${API_BASE_URL}/Alerts`);
    return response.data;
  },

  markAsRead: async (id: string) => {
    const response = await axios.put(`${API_BASE_URL}/Alerts/${id}/read`);
    return response.data;
  },
};
