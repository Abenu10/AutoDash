import React, { useState } from 'react';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterModal from './FilterModal';
import { useAppDispatch } from '../app/hooks';
import { fetchInventoryData } from '../features/dashboard/dashboardSlice';

interface FiltersDropdownProps {
  currentFilters: {
    dealer: string;
    makes: string[];
    duration: string;
  };
  onApplyFilters: (filters: any) => void;
}

const FiltersDropdown: React.FC<FiltersDropdownProps> = ({ currentFilters, onApplyFilters }) => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApplyFilters = (filters: any) => {
    onApplyFilters(filters);
    dispatch(fetchInventoryData(filters));
    handleClose();
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<FilterListIcon />}
        onClick={handleOpen}
        sx={{
          borderColor: '#E0E0E0',
          color: 'text.primary',
          '&:hover': {
            borderColor: '#BDBDBD',
          },
        }}
      >
        Filter Data By
      </Button>
      <FilterModal
        open={open}
        onClose={handleClose}
        onApplyFilters={handleApplyFilters}
        currentFilters={currentFilters}
      />
    </>
  );
};

export default FiltersDropdown;
