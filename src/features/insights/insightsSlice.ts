import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface InsightItem {
  id: string;
  title: string;
  summary: string;
  weekStartDate: string;
  weekEndDate: string;
  delayedDeliveries: string;
  totalDeliveries: string;
  averageDeliveryTime: string;
}

export interface InsightsState {
  items: InsightItem[];
  loading: boolean;
  error: string | null;
}

const initialState: InsightsState = {
  items: [],
  loading: false,
  error: null,
};

export const insightsSlice = createSlice({
  name: 'insights',
  initialState,
  reducers: {
    setInsights: (state, action: PayloadAction<InsightItem[]>) => {
      state.items = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setInsights, setLoading, setError } = insightsSlice.actions;
export default insightsSlice.reducer;
