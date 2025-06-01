import { configureStore } from '@reduxjs/toolkit';
import uploadReducer, { UploadState } from './features/upload/uploadSlice';
import insightsReducer, { InsightsState } from './features/insights/insightsSlice';
import alertsReducer, { AlertsState } from './features/alerts/alertsSlice';

export interface RootState {
  upload: UploadState;
  insights: InsightsState;
  alerts: AlertsState;
}

export const store = configureStore({
  reducer: {
    upload: uploadReducer,
    insights: insightsReducer,
    alerts: alertsReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
