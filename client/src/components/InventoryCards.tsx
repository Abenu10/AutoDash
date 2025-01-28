import { Grid, Paper, Box, Typography } from '@mui/material';
import { useAppSelector } from '../app/hooks';

const InventoryCards = () => {
  const { stats } = useAppSelector((state) => state.dashboard);

  const cards = [
    {
      label: 'New Units',
      count: stats.NEW.count,
      msrp: stats.NEW.totalMSRP,
      avgMsrp: stats.NEW.avgMSRP,
      type: 'NEW',
      color: '#ff9800'
    },
    {
      label: 'Used Units',
      count: stats.USED.count,
      msrp: stats.USED.totalMSRP,
      avgMsrp: stats.USED.avgMSRP,
      type: 'USED',
      color: '#2196f3'
    },
    {
      label: 'CPO Units',
      count: stats.CPO.count,
      msrp: stats.CPO.totalMSRP,
      avgMsrp: stats.CPO.avgMSRP,
      type: 'CPO',
      color: '#4caf50'
    }
  ];

  return (
    <Grid container spacing={3}>
      {cards.map((card) => (
        <Grid item xs={12} md={4} key={card.type}>
          <Paper sx={{ p: 2, height: '100%' }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                  variant="caption"
                  sx={{
                    bgcolor: card.color,
                    color: 'white',
                    px: 1,
                    py: 0.5,
                    borderRadius: 1,
                    fontWeight: 500
                  }}
                >
                  {card.type}
                </Typography>
              </Box>
              
              <Box sx={{ mt: 1 }}>
                <Typography variant="h4" component="div" sx={{ fontWeight: 600 }}>
                  {card.count}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  # {card.label}
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  ${card.msrp.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {card.type} MSRP
                </Typography>
              </Box>

              <Box>
                <Typography variant="body1" sx={{ fontWeight: 500 }}>
                  ${card.avgMsrp.toLocaleString()}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {card.type} Avg. MSRP
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
};

export default InventoryCards;
