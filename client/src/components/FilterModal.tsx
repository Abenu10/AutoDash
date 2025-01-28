import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  FormGroup,
  FormControlLabel,
  Checkbox,
  Button,
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import axios from 'axios';
import { endpoints } from '../utils/api';

interface Dealer {
  id: string;
  name: string;
}

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  onApplyFilters: (filters: any) => void;
}

const FilterModal: React.FC<FilterModalProps> = ({ open, onClose, onApplyFilters }) => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [selectedDealer, setSelectedDealer] = useState('');
  const [filters, setFilters] = useState({
    make: {
      Ford: false,
      Cadillac: false,
      Jeep: false,
    },
    duration: {
      'Last Month': false,
      'This Month': false,
      'Last 3 Months': false,
      'Last 6 Months': false,
      'This Year': false,
      'Last Year': false,
    },
  });
  const [makes, setMakes] = useState<string[]>([]);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axios.get(endpoints.dealers);
        setDealers(response.data?.dealers || []);
      } catch (error) {
        console.error('Error fetching dealers:', error);
        setDealers([]);
      }
    };
    fetchDealers();
  }, []);

  useEffect(() => {
    const fetchMakes = async () => {
      try {
        const response = await axios.get(endpoints.makes);
        setMakes(response.data?.makes || []);
      } catch (error) {
        console.error('Error fetching makes:', error);
        setMakes([]);
      }
    };
    fetchMakes();
  }, []);

  const handleDealerChange = (event: any) => {
    setSelectedDealer(event.target.value);
  };

  const handleCheckboxChange = (category: 'make' | 'duration', item: string) => {
    setFilters((prev) => ({
      ...prev,
      [category]: {
        ...prev[category],
        [item]: !prev[category][item],
      },
    }));
  };

  const handleApplyFilters = () => {
    onApplyFilters({ ...filters, dealer: selectedDealer });
    onClose();
  };

  const handleRemoveAllFilters = () => {
    setFilters({
      make: {
        Ford: false,
        Cadillac: false,
        Jeep: false,
      },
      duration: {
        'Last Month': false,
        'This Month': false,
        'Last 3 Months': false,
        'Last 6 Months': false,
        'This Year': false,
        'Last Year': false,
      },
    });
    setSelectedDealer('');
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>
        <Box display="flex" alignItems="center" gap={1}>
          <Typography variant="h6">Filter Data By</Typography>
        </Box>
      </DialogTitle>
      <DialogContent>
        <Box sx={{ mb: 3 }}>
          <FormControl fullWidth size="small">
            <InputLabel>Select a Dealer</InputLabel>
            <Select
              value={selectedDealer}
              onChange={handleDealerChange}
              label="Select a Dealer"
            >
              <MenuItem value="">All Dealers</MenuItem>
              {Array.isArray(dealers) && dealers.map((dealer) => (
                <MenuItem key={dealer.id} value={dealer.id}>
                  {dealer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>MAKE</Typography>
        <FormGroup>
          {Object.entries(filters.make).map(([make, checked]) => (
            <FormControlLabel
              key={make}
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => handleCheckboxChange('make', make)}
                />
              }
              label={make}
            />
          ))}
        </FormGroup>

        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>DURATION</Typography>
        <FormGroup>
          {Object.entries(filters.duration).map(([duration, checked]) => (
            <FormControlLabel
              key={duration}
              control={
                <Checkbox
                  checked={checked}
                  onChange={() => handleCheckboxChange('duration', duration)}
                />
              }
              label={duration}
            />
          ))}
        </FormGroup>

        <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            onClick={handleApplyFilters}
            fullWidth
            sx={{ bgcolor: '#F5A623' }}
          >
            APPLY FILTER
          </Button>
          <Button
            variant="outlined"
            onClick={handleRemoveAllFilters}
            fullWidth
            sx={{ color: '#F5A623', borderColor: '#F5A623' }}
          >
            REMOVE ALL FILTERS
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default FilterModal;
