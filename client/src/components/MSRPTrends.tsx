import { useAppSelector } from '../app/hooks';
import { Box, Typography, ToggleButton, ToggleButtonGroup } from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';
import { useState } from 'react';
import { Vehicle } from '../types/inventory';

const MSRPTrends = () => {
  const { vehicles } = useAppSelector((state) => state.dashboard);
  const [selectedType, setSelectedType] = useState<'NEW' | 'USED' | 'CPO'>('NEW');

  // Process data for the charts
  const processData = (data: Vehicle[]) => {
    const groupedByDate = data.reduce((acc, vehicle) => {
      const date = new Date(vehicle.dateAdded).toLocaleDateString('en-US', { 
        month: '2-digit',
        day: '2-digit',
        year: '2-digit'
      });
      
      if (!acc[date]) {
        acc[date] = {
          date,
          NEW: { count: 0, totalMSRP: 0 },
          USED: { count: 0, totalMSRP: 0 },
          CPO: { count: 0, totalMSRP: 0 }
        };
      }
      
      acc[date][vehicle.condition].count += 1;
      acc[date][vehicle.condition].totalMSRP += vehicle.msrp;
      return acc;
    }, {} as Record<string, any>);

    return Object.entries(groupedByDate)
      .sort(([dateA], [dateB]) => new Date(dateA).getTime() - new Date(dateB).getTime())
      .map(([date, data]) => ({
        date,
        NEW: data.NEW.count,
        USED: data.USED.count,
        CPO: data.CPO.count,
        NEW_AVG: data.NEW.count > 0 ? data.NEW.totalMSRP / data.NEW.count : 0,
        USED_AVG: data.USED.count > 0 ? data.USED.totalMSRP / data.USED.count : 0,
        CPO_AVG: data.CPO.count > 0 ? data.CPO.totalMSRP / data.CPO.count : 0
      }));
  };

  const data = processData(vehicles);

  const handleTypeChange = (
    _event: React.MouseEvent<HTMLElement>,
    newType: 'NEW' | 'USED' | 'CPO'
  ) => {
    if (newType !== null) {
      setSelectedType(newType);
    }
  };

  const chartStyle = {
    '& .recharts-cartesian-grid-horizontal line': {
      stroke: '#e0e0e0',
      strokeDasharray: '3 3'
    },
    '& .recharts-cartesian-grid-vertical line': {
      stroke: '#e0e0e0',
      strokeDasharray: '3 3'
    }
  };

  return (
    <Box>
      {/* Inventory Count Chart */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Inventory Count
        </Typography>
        <ToggleButtonGroup
          value={selectedType}
          exclusive
          onChange={handleTypeChange}
          size="small"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="NEW" sx={{ bgcolor: selectedType === 'NEW' ? '#ff9800' : 'inherit' }}>
            NEW
          </ToggleButton>
          <ToggleButton value="USED" sx={{ bgcolor: selectedType === 'USED' ? '#2196f3' : 'inherit' }}>
            USED
          </ToggleButton>
          <ToggleButton value="CPO" sx={{ bgcolor: selectedType === 'CPO' ? '#4caf50' : 'inherit' }}>
            CPO
          </ToggleButton>
        </ToggleButtonGroup>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }} sx={chartStyle}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Bar
              dataKey={selectedType}
              fill={selectedType === 'NEW' ? '#ff9800' : selectedType === 'USED' ? '#2196f3' : '#4caf50'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>

      {/* Average MSRP Chart */}
      <Box>
        <Typography variant="subtitle1" gutterBottom>
          Average MSRP in USD
        </Typography>
        <ToggleButtonGroup
          value={selectedType}
          exclusive
          onChange={handleTypeChange}
          size="small"
          sx={{ mb: 2 }}
        >
          <ToggleButton value="NEW" sx={{ bgcolor: selectedType === 'NEW' ? '#ff9800' : 'inherit' }}>
            NEW
          </ToggleButton>
          <ToggleButton value="USED" sx={{ bgcolor: selectedType === 'USED' ? '#2196f3' : 'inherit' }}>
            USED
          </ToggleButton>
          <ToggleButton value="CPO" sx={{ bgcolor: selectedType === 'CPO' ? '#4caf50' : 'inherit' }}>
            CPO
          </ToggleButton>
        </ToggleButtonGroup>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 5 }} sx={chartStyle}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Bar
              dataKey={`${selectedType}_AVG`}
              fill={selectedType === 'NEW' ? '#ff9800' : selectedType === 'USED' ? '#2196f3' : '#4caf50'}
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </Box>
    </Box>
  );
};

export default MSRPTrends;
