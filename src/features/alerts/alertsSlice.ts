import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Alert {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
  createdAt: string;
  severity?: 'low' | 'medium' | 'high';
  deliveryId?: string; // Optional field to link alert to a specific delivery
}

export interface AlertsState {
  items: Alert[];
  loading: boolean;
  error: string | null;
}

const initialState: AlertsState = {
  items: [],
  loading: false,
  error: null,
};

export const alertsSlice = createSlice({
  name: 'alerts',
  initialState,
  reducers: {
    setAlerts: (state, action: PayloadAction<Alert[]>) => {
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

export const { setAlerts, setLoading, setError } = alertsSlice.actions;
export default alertsSlice.reducer;
