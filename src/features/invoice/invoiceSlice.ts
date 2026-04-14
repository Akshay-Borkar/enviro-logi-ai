import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

export interface LineItem {
  description: string;
  quantity: number;
  unitPrice: number;
  amount: number;
}

export interface ValidationDetails {
  isValid: boolean;
  confidenceScores: Record<string, number>;
}

export interface Invoice {
  id: string;
  invoiceId: string;
  invoiceNumber: string;
  customerName: string;
  total: number;
  date: string;
  confidenceScores: Record<string, number>;
  status: 'pending' | 'reviewed' | 'approved' | 'rejected';
  createdAt: string;
  lastModifiedAt: string;
  lineItems: LineItem[];
  validationDetails: ValidationDetails;
}

interface InvoiceState {
  items: Invoice[];
  reviewList: Invoice[];
  currentInvoice: Invoice | null;
  loading: boolean;
  error: string | null;
  totalPages: number;
  currentPage: number;
}

const initialState: InvoiceState = {
  items: [],
  reviewList: [],
  currentInvoice: null,
  loading: false,
  error: null,
  totalPages: 0,
  currentPage: 1
};

import { invoiceApi } from '../../services/invoiceService';

export const uploadInvoice = createAsyncThunk(
  'invoice/upload',
  async (payload: { file: File; metadata?: Record<string, string> }) => {
    return await invoiceApi.uploadInvoice(payload.file, payload.metadata);
  }
);

export const fetchInvoices = createAsyncThunk(
  'invoice/fetchAll',
  async (page: number) => {
    return await invoiceApi.getInvoices(page);
  }
);

export const fetchInvoiceReviewList = createAsyncThunk(
  'invoice/fetchReviewList',
  async () => {
    return await invoiceApi.getInvoicesForReview();
  }
);

export const submitInvoiceCorrection = createAsyncThunk(
  'invoice/submitCorrection',
  async ({ id, corrections }: { id: string; corrections: Partial<Invoice> }) => {
    return await invoiceApi.submitCorrection(id, corrections);
  }
);

const invoiceSlice = createSlice({
  name: 'invoice',
  initialState,
  reducers: {
    setCurrentInvoice: (state, action: PayloadAction<Invoice>) => {
      state.currentInvoice = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Upload Invoice
      .addCase(uploadInvoice.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadInvoice.fulfilled, (state, action) => {
        state.loading = false;
        state.items = [...state.items, action.payload];
      })
      .addCase(uploadInvoice.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to upload invoice';
      })
      // Fetch Invoices
      .addCase(fetchInvoices.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoices.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalPages = action.payload.totalPages;
        state.currentPage = action.payload.currentPage;
      })
      .addCase(fetchInvoices.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch invoices';
      })
      // Fetch Review List
      .addCase(fetchInvoiceReviewList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInvoiceReviewList.fulfilled, (state, action) => {
        state.loading = false;
        state.reviewList = action.payload;
      })
      .addCase(fetchInvoiceReviewList.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch review list';
      })
      // Submit Correction
      .addCase(submitInvoiceCorrection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(submitInvoiceCorrection.fulfilled, (state, action) => {
        state.loading = false;
        state.currentInvoice = action.payload;
        state.items = state.items.map(item => 
          item.id === action.payload.id ? action.payload : item
        );
        state.reviewList = state.reviewList.filter(item => 
          item.id !== action.payload.id
        );
      })
      .addCase(submitInvoiceCorrection.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to submit correction';
      });
  }
});

export const { setCurrentInvoice, clearError } = invoiceSlice.actions;
export default invoiceSlice.reducer;
