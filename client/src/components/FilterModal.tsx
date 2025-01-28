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
  currentFilters: {
    dealer: string;
    makes: string[];
    duration: string;
  };
}

const FilterModal: React.FC<FilterModalProps> = ({
  open,
  onClose,
  onApplyFilters,
  currentFilters
}) => {
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [selectedDealer, setSelectedDealer] = useState(currentFilters.dealer || '');
  const [selectedMakes, setSelectedMakes] = useState<string[]>(currentFilters.makes || []);
  const [selectedDuration, setSelectedDuration] = useState(currentFilters.duration || '');
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
        const response = await axios.get(`${endpoints.inventory}/makes`);
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

  const handleMakeChange = (make: string) => {
    setSelectedMakes(prev => {
      if (prev.includes(make)) {
        return prev.filter(m => m !== make);
      }
      return [...prev, make];
    });
  };

  const handleDurationChange = (duration: string) => {
    setSelectedDuration(duration);
  };

  const handleApplyFilters = () => {
    onApplyFilters({
      dealer: selectedDealer,
      makes: selectedMakes,
      duration: selectedDuration
    });
    onClose();
  };

  const handleRemoveAllFilters = () => {
    setSelectedDealer('');
    setSelectedMakes([]);
    setSelectedDuration('');
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
              {dealers.map((dealer) => (
                <MenuItem key={dealer.id} value={dealer.id}>
                  {dealer.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>MAKE</Typography>
        <FormGroup>
          {makes.map((make) => (
            <FormControlLabel
              key={make}
              control={
                <Checkbox
                  checked={selectedMakes.includes(make)}
                  onChange={() => handleMakeChange(make)}
                />
              }
              label={make}
            />
          ))}
        </FormGroup>

        <Typography variant="subtitle2" sx={{ mt: 2, mb: 1 }}>DURATION</Typography>
        <FormGroup>
          {[
            'Last Month',
            'This Month',
            'Last 3 Months',
            'Last 6 Months',
            'This Year',
            'Last Year'
          ].map((duration) => (
            <FormControlLabel
              key={duration}
              control={
                <Checkbox
                  checked={selectedDuration === duration}
                  onChange={() => handleDurationChange(duration)}
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
