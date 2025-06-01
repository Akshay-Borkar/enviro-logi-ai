import { useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  CircularProgress,
  Grid,
} from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setAlerts, setLoading, setError, Alert } from '../features/alerts/alertsSlice';
import { alertsApi } from '../services/alertsService';

export const AlertsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.alerts);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        dispatch(setLoading(true));
        const data = await alertsApi.getAlerts();
        dispatch(setAlerts(data));
        dispatch(setError(null));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to load alerts'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchAlerts();
  }, []);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 3 }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ p: 3 }}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Delivery Alerts
      </Typography>
      <Paper elevation={3} sx={{ borderRadius: 2 }}>
        <List sx={{ p: 2 }}>
          {items.map((alert: Alert) => (
            <ListItem
              key={alert.id}
              divider
              sx={{
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <Grid container spacing={1} sx={{ alignItems: 'center' }}>
                <Grid item xs={12} sm>
                  <Typography variant="body2" color="text.secondary">
                    {alert.message}
                  </Typography>
                </Grid>
                {alert.severity && (
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      Severity: {alert.severity.charAt(0).toUpperCase() + alert.severity.slice(1)}
                    </Typography>
                  </Grid>
                )}
                {alert.deliveryId && (
                  <Grid item>
                    <Typography variant="body2" color="text.secondary">
                      Delivery ID: {alert.deliveryId}
                    </Typography>
                  </Grid>
                )}
                <Grid item xs={12} sm="auto">
                  <Typography variant="body2" color="text.secondary">
                    {new Date(alert.createdAt).toLocaleString()}
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          ))}
          {items.length === 0 && (
            <ListItem>
              <ListItemText primary="No alerts to display" />
            </ListItem>
          )}
        </List>
      </Paper>
    </Box>
  );
};
