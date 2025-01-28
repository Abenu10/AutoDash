import { Box, Typography } from '@mui/material';
import { formatCurrency } from '../utils/format';

interface StatsCardProps {
  count: number;
  label: string;
  value: number;
  valueLabel: string;
  variant: 'new' | 'used' | 'cpo';
}

const StatsCard = ({ count, label, value, valueLabel, variant }: StatsCardProps) => {
  const colors = {
    new: '#FFB74D',
    used: '#4FC3F7',
    cpo: '#81C784'
  };

  return (
    <Box
      sx={{
        bgcolor: 'white',
        borderRadius: 1,
        p: 2,
        minWidth: 200,
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
        display: 'flex',
        flexDirection: 'column',
        gap: 1
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h6" sx={{ color: colors[variant] }}>
          {count}
        </Typography>
        <Typography variant="body2" sx={{ color: colors[variant] }}>
          {label}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>
          {formatCurrency(value)}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {valueLabel}
        </Typography>
      </Box>
    </Box>
  );
};

export default StatsCard;
