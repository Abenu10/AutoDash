import React, { useState } from 'react';
import { Button } from '@mui/material';
import FilterListIcon from '@mui/icons-material/FilterList';
import FilterModal from './FilterModal';
import { useAppDispatch } from '../app/hooks';
import { setFilters } from '../features/dashboard/dashboardSlice';

const FiltersDropdown = () => {
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleApplyFilters = (filters: any) => {
    dispatch(setFilters(filters));
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
      />
    </>
  );
};

export default FiltersDropdown;
