import React, { useState } from 'react';
import { Box, Button, Paper, Typography, Grid, LinearProgress, Alert } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { uploadInvoice } from '../features/invoice/invoiceSlice';
import { AppDispatch } from '../store';

interface FileUploadComponentProps {
  onUploadComplete?: () => void;
}

export const FileUploadComponent: React.FC<FileUploadComponentProps> = ({ onUploadComplete }) => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error } = useSelector((state: RootState) => state.invoice);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      if (file.type === 'application/pdf' || file.type.startsWith('image/')) {
        setSelectedFile(file);
        setUploadError(null);
      } else {
        setUploadError('Please select a PDF or image file');
      }
    }
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) return;

    try {
      await dispatch(
        uploadInvoice({
          file: selectedFile,
          metadata: {},
        })
      );

      setSelectedFile(null);
      setUploadError(null);

      if (onUploadComplete) {
        onUploadComplete();
      }
    } catch (err) {
      console.error(err);
      setUploadError('Failed to upload invoice. Please try again.');
    }
  };
  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Box component="form" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'grey.300',
                borderRadius: 1,
                p: 3,
                textAlign: 'center',
              }}
            >
              <input
                accept="application/pdf,image/*"
                style={{ display: 'none' }}
                id="invoice-file-input"
                type="file"
                onChange={handleFileChange}
              />
              <label htmlFor="invoice-file-input">
                <Button variant="contained" component="span">
                  Select Invoice (PDF/Image)
                </Button>
              </label>
              {selectedFile && (
                <Typography sx={{ mt: 2 }}>Selected: {selectedFile.name}</Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            {loading && <LinearProgress />}
            {(error || uploadError) && (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error || uploadError}
              </Alert>
            )}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              disabled={!selectedFile || loading}
              sx={{ mt: 2 }}
            >
              Upload Invoice
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Paper>
  );
};
