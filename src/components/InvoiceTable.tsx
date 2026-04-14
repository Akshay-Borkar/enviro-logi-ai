import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  TablePagination,
} from '@mui/material';
import { Visibility, Edit } from '@mui/icons-material';
import { Invoice } from '../features/invoice/invoiceSlice';
import { ConfidenceBadge } from './ConfidenceBadge';

interface InvoiceTableProps {
  invoices: Invoice[];
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onViewInvoice: (invoice: Invoice) => void;
  onEditInvoice: (invoice: Invoice) => void;
}

export const InvoiceTable: React.FC<InvoiceTableProps> = ({
  invoices,
  page,
  totalPages,
  onPageChange,
  onViewInvoice,
  onEditInvoice,
}) => {
  const handleChangePage = (_event: unknown, newPage: number) => {
    onPageChange(newPage);
  };

  const getOverallConfidence = (scores: Record<string, number>) => {
    const values = Object.values(scores);
    return values.length > 0 ? Math.min(...values) : 0;
  };

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Invoice Number</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Customer</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Confidence</TableCell>
              <TableCell>Actionsss</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {invoices.map((invoice) => (
              <TableRow key={invoice?.id}>
                <TableCell>{invoice?.invoiceNumber}</TableCell>
                <TableCell>{new Date(invoice.date).toLocaleDateString()}</TableCell>
                <TableCell>{invoice?.customerName}</TableCell>
                <TableCell>${invoice?.total?.toFixed(2)}</TableCell>
                <TableCell>
                  {invoice?.status?.charAt(0).toUpperCase() + invoice?.status?.slice(1)}
                </TableCell>
                <TableCell>
                  <ConfidenceBadge value={getOverallConfidence(invoice?.confidenceScores)} />
                </TableCell>
                <TableCell>
                  <IconButton
                    size="small"
                    onClick={() => onViewInvoice(invoice)}
                    title="View Details"
                  >
                    <Visibility />
                  </IconButton>
                  {invoice?.status?.toLowerCase() === 'pending' && (
                    <IconButton
                      size="small"
                      onClick={() => onEditInvoice(invoice)}
                      title="Edit Invoice"
                    >
                      <Edit />
                    </IconButton>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        component="div"
        count={totalPages * 10} // Assuming 10 items per page
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={10}
        rowsPerPageOptions={[10]}
      />
    </Paper>
  );
};
