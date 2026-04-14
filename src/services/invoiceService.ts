import axios from 'axios';
import { Invoice } from '../features/invoice/invoiceSlice';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5033/api';

export const invoiceApi = {
  uploadInvoice: async (file: File, metadata?: Record<string, string>) => {
    const formData = new FormData();
    formData.append('file', file);
    if (metadata) {
      Object.entries(metadata).forEach(([key, value]) => {
        formData.append(key, value);
      });
    }
    const response = await axios.post(`${API_BASE_URL}/invoices/upload`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  },

  getInvoices: async (page: number = 1, limit: number = 10) => {
    const response = await axios.get(
      `${API_BASE_URL}/invoices/list?page=${page}&pageSize=${limit}`
    );
    return response.data;
  },

  getInvoiceById: async (id: string) => {
    const response = await axios.get(`${API_BASE_URL}/invoices/${id}`);
    return response.data;
  },

  getInvoicesForReview: async () => {
    const response = await axios.get(`${API_BASE_URL}/invoices/review-needed`);
    return response.data;
  },

  submitCorrection: async (id: string, corrections: Partial<Invoice>) => {
    const response = await axios.post(
      `${API_BASE_URL}/invoices/${id}/correct`,
      corrections
    );
    return response.data;
  },
};
