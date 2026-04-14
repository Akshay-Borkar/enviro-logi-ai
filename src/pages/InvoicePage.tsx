import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  CircularProgress,
  Alert,
  Divider,
} from '@mui/material';
import { RootState } from '../store';
import { fetchInvoices, setCurrentInvoice } from '../features/invoice/invoiceSlice';
import { FileUploadComponent } from '../components/FileUploadComponent';
import { InvoiceTable } from '../components/InvoiceTable';

export const InvoicePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items, loading, error, currentPage, totalPages } = useSelector(
    (state: RootState) => state.invoice
  );

  useEffect(() => {
    dispatch(fetchInvoices(currentPage) as any);
  }, [dispatch, currentPage]);

  const handlePageChange = (page: number) => {
    dispatch(fetchInvoices(page) as any);
  };

  const handleViewInvoice = (invoice: any) => {
    dispatch(setCurrentInvoice(invoice));
    navigate(`/invoices/${invoice.id}`);
  };

  const handleEditInvoice = (invoice: any) => {
    dispatch(setCurrentInvoice(invoice));
    navigate(`/invoices/${invoice.id}/edit`);
  };

  const handleUploadComplete = () => {
    dispatch(fetchInvoices(1) as any);
  };

  if (loading && items.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Invoice Management
      </Typography>

      <FileUploadComponent onUploadComplete={handleUploadComplete} />
      
      <Divider sx={{ my: 3 }} />

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Typography variant="h5" gutterBottom>
        Recent Invoices
      </Typography>

      <InvoiceTable
        invoices={items}
        page={currentPage - 1} // MUI uses 0-based pagination
        totalPages={totalPages}
        onPageChange={handlePageChange}
        onViewInvoice={handleViewInvoice}
        onEditInvoice={handleEditInvoice}
      />
    </Box>
  );
};
