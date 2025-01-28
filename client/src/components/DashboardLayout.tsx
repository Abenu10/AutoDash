import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Select,
  MenuItem,
  FormControl,
  CircularProgress,
  InputLabel,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import StatsCard from "./StatsCard";
import FiltersDropdown from "./FiltersDropdown";
import { fetchInventoryData } from "../features/dashboard/dashboardSlice";
import HistoryLog from "./HistoryLog";
import MSRPTrends from "./MSRPTrends";
import Navbar from "./Navbar";
import axios from "axios";

interface Dealer {
  id: string;
  name: string;
}

const DashboardLayout = () => {
  const dispatch = useAppDispatch();
  const { stats, loading, error } = useAppSelector((state) => state.dashboard);
  const [dealers, setDealers] = useState<Dealer[]>([]);
  const [filters, setFilters] = useState({
    dealer: '',
    makes: [] as string[],
    duration: ''
  });

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        const response = await axios.get("http://localhost:7071/api/dealers");
        setDealers(response.data.dealers || []);
      } catch (error) {
        console.error("Error fetching dealers:", error);
      }
    };
    fetchDealers();
  }, []);

  useEffect(() => {
    dispatch(fetchInventoryData(filters));
  }, [dispatch, filters]);

  const handleFilterChange = (newFilters: any) => {
    setFilters(prev => ({
      ...prev,
      ...newFilters
    }));
  };

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
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
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Navbar />
      <Container maxWidth={false} sx={{ mt: 3, mb: 3 }}>
        <Box sx={{ flexGrow: 1 }}>
          {/* Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography variant="h5" component="h1" sx={{ fontWeight: 600 }}>
              Inventory
            </Typography>
            <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
              <Typography variant="body2" color="text.secondary">
                Select a Dealer
              </Typography>
              <FormControl size="small" sx={{ minWidth: 200 }}>
                <Select
                  value={filters.dealer}
                  onChange={(e) => handleFilterChange({ dealer: e.target.value })}
                  displayEmpty
                >
                  <MenuItem value="">All Dealers</MenuItem>
                  {dealers.map((dealer) => (
                    <MenuItem key={dealer.id} value={dealer.id}>
                      {dealer.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FiltersDropdown onApplyFilters={handleFilterChange} currentFilters={filters} />
            </Box>
          </Box>

          {/* Recent Data */}
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
            Recent Gathered Data {new Date().toLocaleDateString()}
          </Typography>

          {/* Stats Cards */}
          <Box sx={{ display: "flex", gap: 2, mb: 4, flexWrap: "wrap" }}>
            <StatsCard
              count={stats.NEW.count}
              label="New Units"
              value={stats.NEW.totalMSRP}
              valueLabel="New MSRP"
              variant="new"
            />
            <StatsCard
              count={stats.NEW.count}
              label="New Units"
              value={stats.NEW.avgMSRP}
              valueLabel="New Avg. MSRP"
              variant="new"
            />
            <StatsCard
              count={stats.USED.count}
              label="Used Units"
              value={stats.USED.totalMSRP}
              valueLabel="Used MSRP"
              variant="used"
            />
            <StatsCard
              count={stats.USED.count}
              label="Used Units"
              value={stats.USED.avgMSRP}
              valueLabel="Used Avg. MSRP"
              variant="used"
            />
            <StatsCard
              count={stats.CPO.count}
              label="CPO Units"
              value={stats.CPO.totalMSRP}
              valueLabel="CPO MSRP"
              variant="cpo"
            />
          </Box>

          {/* Charts */}
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <MSRPTrends />
              </Paper>
            </Grid>
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <HistoryLog />
              </Paper>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
};

export default DashboardLayout;
