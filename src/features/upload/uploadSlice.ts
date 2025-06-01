import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UploadState {
  files: File[];
  uploading: boolean;
  error: string | null;
}

const initialState: UploadState = {
  files: [],
  uploading: false,
  error: null,
};

export const uploadSlice = createSlice({
  name: 'upload',
  initialState,
  reducers: {
    setFiles: (state, action: PayloadAction<File[]>) => {
      state.files = action.payload;
    },
    setUploading: (state, action: PayloadAction<boolean>) => {
      state.uploading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

export const { setFiles, setUploading, setError } = uploadSlice.actions;
export default uploadSlice.reducer;
