import { configureStore } from '@reduxjs/toolkit';
import uploadReducer, { UploadState } from './features/upload/uploadSlice';
import insightsReducer, { InsightsState } from './features/insights/insightsSlice';
import alertsReducer, { AlertsState } from './features/alerts/alertsSlice';
import invoiceReducer from './features/invoice/invoiceSlice';

export interface RootState {
  upload: UploadState;
  insights: InsightsState;
  alerts: AlertsState;
  invoice: ReturnType<typeof invoiceReducer>;
}

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    insights: insightsReducer,
    alerts: alertsReducer,
    invoice: invoiceReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
