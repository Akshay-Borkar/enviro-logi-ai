import React from 'react';
import { Box, Typography, Paper, Button } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setFiles, setUploading, setError } from '../features/upload/uploadSlice';
import { uploadApi } from '../services/uploadService';

export const UploadPage = () => {
  const dispatch = useDispatch();
  const { files, uploading, error } = useSelector((state: RootState) => state.upload);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      dispatch(setFiles(Array.from(event.target.files)));
    }
  };

  const handleUpload = async () => {
    try {
      dispatch(setUploading(true));
      await uploadApi.uploadDocuments(files);
      dispatch(setFiles([]));
      dispatch(setError(null));
    } catch (err) {
      dispatch(setError(err instanceof Error ? err.message : 'Upload failed'));
    } finally {
      dispatch(setUploading(false));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Upload Documents
      </Typography>{' '}
      <Paper sx={{ p: 3, maxWidth: 600, mx: 'auto' }}>
        <Box component="form">
          <Box
            component="input"
            type="file"
            multiple
            onChange={handleFileChange}
            sx={{ display: 'none' }}
            id="file-input"
          />
          <Button
            variant="contained"
            component="label"
            htmlFor="file-input"
            fullWidth
            sx={{ mb: 2 }}
          >
            Select Files
          </Button>
        </Box>
        {files.length > 0 && (
          <>
            <Typography variant="body1" gutterBottom>
              Selected files: {files.map((f: File) => f.name).join(', ')}
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={handleUpload}
              disabled={uploading}
              fullWidth
            >
              {uploading ? 'Uploading...' : 'Upload'}
            </Button>
          </>
        )}
        {error && (
          <Typography color="error" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Box>
  );
};
