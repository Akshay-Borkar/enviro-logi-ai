import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box } from '@mui/material';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './utils/theme';
import { Navbar } from './components/Navbar';
import { UploadPage } from './pages/UploadPage';
import { InsightsPage } from './pages/InsightsPage';
import { AlertsPage } from './pages/AlertsPage';
import { InvoicePage } from './pages/InvoicePage';
import { ChatMenu } from './components/ChatMenu';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Box className="App">
          <Navbar />
          <Routes>
            <Route path="/" element={<Navigate to="/invoices" replace />} />
            <Route path="/upload" element={<UploadPage />} />
            <Route path="/insights" element={<InsightsPage />} />
            <Route path="/alerts" element={<AlertsPage />} />
            <Route path="/invoices" element={<InvoicePage />} />
          </Routes>
          <ChatMenu />
        </Box>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
