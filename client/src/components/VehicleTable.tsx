import { 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  Paper
} from '@mui/material';
import { useAppSelector } from '../app/hooks';
import { formatCurrency } from '../utils/format';

const VehicleTable = () => {
  const { vehicles } = useAppSelector((state) => state.dashboard);

  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Make</TableCell>
            <TableCell>Model</TableCell>
            <TableCell>Year</TableCell>
            <TableCell>Condition</TableCell>
            <TableCell align="right">MSRP</TableCell>
            <TableCell>Date Added</TableCell>
            <TableCell>Dealer</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {vehicles.map((vehicle) => (
            <TableRow key={vehicle.id}>
              <TableCell>{vehicle.make}</TableCell>
              <TableCell>{vehicle.model}</TableCell>
              <TableCell>{vehicle.year}</TableCell>
              <TableCell>{vehicle.condition}</TableCell>
              <TableCell align="right">{formatCurrency(vehicle.msrp)}</TableCell>
              <TableCell>{new Date(vehicle.dateAdded).toLocaleDateString()}</TableCell>
              <TableCell>{vehicle.dealer}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default VehicleTable;
