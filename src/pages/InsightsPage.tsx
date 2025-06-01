import { useEffect } from 'react';
import { Box, Typography, Grid, CircularProgress, Card, CardContent } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store';
import { setInsights, setLoading, setError, InsightItem } from '../features/insights/insightsSlice';
import { insightsApi } from '../services/insightsService';

export const InsightsPage = () => {
  const dispatch = useDispatch();
  const { items, loading, error } = useSelector((state: RootState) => state.insights);

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        dispatch(setLoading(true));
        const data = await insightsApi.getInsights();
        dispatch(setInsights(data));
        dispatch(setError(null));
      } catch (err) {
        dispatch(setError(err instanceof Error ? err.message : 'Failed to load insights'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchInsights();
  }, [dispatch]);

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
        Logistics Insights
      </Typography>
      <Grid container spacing={3}>
        {items.map((insight: InsightItem) => (
          <Grid key={insight.id} item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {insight.summary}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {new Date(insight.weekStartDate).toLocaleDateString()} -{' '}
                  {new Date(insight.weekEndDate).toLocaleDateString()}
                </Typography>
                <Typography variant="body1">
                  <strong>Average Delivery Time:</strong> {insight.averageDeliveryTime}
                </Typography>
                <Typography variant="body1">
                  <strong>Delayed Deliveries:</strong> {insight.delayedDeliveries}
                </Typography>
                <Typography variant="body1">
                  <strong>Total Deliveries:</strong> {insight.totalDeliveries}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

