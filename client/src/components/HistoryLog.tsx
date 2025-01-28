import { useState } from 'react';
import { useAppSelector } from '../app/hooks';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TableSortLabel,
  Paper,
  Typography
} from '@mui/material';
import { Vehicle } from '../types/inventory';

type Order = 'asc' | 'desc';

const HistoryLog = () => {
  const { vehicles } = useAppSelector((state) => state.dashboard);
  const [orderBy, setOrderBy] = useState<keyof Vehicle>('dateAdded');
  const [order, setOrder] = useState<Order>('desc');

  const handleSort = (property: keyof Vehicle) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const sortedVehicles = [...vehicles].sort((a, b) => {
    if (orderBy === 'dateAdded') {
      return order === 'asc'
        ? new Date(a.dateAdded).getTime() - new Date(b.dateAdded).getTime()
        : new Date(b.dateAdded).getTime() - new Date(a.dateAdded).getTime();
    }
    return order === 'asc'
      ? String(a[orderBy]).localeCompare(String(b[orderBy]))
      : String(b[orderBy]).localeCompare(String(a[orderBy]));
  });

  return (
    <>
      <Typography variant="h6" gutterBottom>
        History Log
      </Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'make'}
                  direction={orderBy === 'make' ? order : 'asc'}
                  onClick={() => handleSort('make')}
                >
                  Make
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'model'}
                  direction={orderBy === 'model' ? order : 'asc'}
                  onClick={() => handleSort('model')}
                >
                  Model
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'year'}
                  direction={orderBy === 'year' ? order : 'asc'}
                  onClick={() => handleSort('year')}
                >
                  Year
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'condition'}
                  direction={orderBy === 'condition' ? order : 'asc'}
                  onClick={() => handleSort('condition')}
                >
                  Condition
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'msrp'}
                  direction={orderBy === 'msrp' ? order : 'asc'}
                  onClick={() => handleSort('msrp')}
                >
                  MSRP
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === 'dateAdded'}
                  direction={orderBy === 'dateAdded' ? order : 'asc'}
                  onClick={() => handleSort('dateAdded')}
                >
                  Date Added
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedVehicles.map((vehicle) => (
              <TableRow key={vehicle.id}>
                <TableCell>{vehicle.make}</TableCell>
                <TableCell>{vehicle.model}</TableCell>
                <TableCell>{vehicle.year}</TableCell>
                <TableCell>{vehicle.condition}</TableCell>
                <TableCell>${vehicle.msrp.toLocaleString()}</TableCell>
                <TableCell>{new Date(vehicle.dateAdded).toLocaleDateString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};

export default HistoryLog;
