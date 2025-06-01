import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5033/api';

export const insightsApi = {
  getInsights: async () => {
    const response = await axios.get(`${API_BASE_URL}/Insights`);
    return response.data;
  },

  getInsightById: async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/Insights/${id}`);
    return response.data;
  },
};
