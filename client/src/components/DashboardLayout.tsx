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
import { endpoints } from "../utils/api";
import { Analytics } from "@vercel/analytics/react"

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
        const response = await axios.get(endpoints.dealers);
        setDealers(response.data?.dealers || []);
      } catch (error) {
        console.error("Error fetching dealers:", error);
        setDealers([]);
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

  // Default stats if not available
  const defaultStats = {
    NEW: { count: 0, totalMSRP: 0, avgMSRP: 0 },
    USED: { count: 0, totalMSRP: 0, avgMSRP: 0 },
    CPO: { count: 0, totalMSRP: 0, avgMSRP: 0 }
  };

  const currentStats = stats || defaultStats;

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
                  {Array.isArray(dealers) && dealers.map((dealer) => (
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
              count={currentStats.NEW.count}
              label="New Units"
              value={currentStats.NEW.totalMSRP}
              valueLabel="New MSRP"
              variant="new"
            />
            <StatsCard
              count={currentStats.NEW.count}
              label="New Units"
              value={currentStats.NEW.avgMSRP}
              valueLabel="New Avg. MSRP"
              variant="new"
            />
            <StatsCard
              count={currentStats.USED.count}
              label="Used Units"
              value={currentStats.USED.totalMSRP}
              valueLabel="Used MSRP"
              variant="used"
            />
            <StatsCard
              count={currentStats.USED.count}
              label="Used Units"
              value={currentStats.USED.avgMSRP}
              valueLabel="Used Avg. MSRP"
              variant="used"
            />
            <StatsCard
              count={currentStats.CPO.count}
              label="CPO Units"
              value={currentStats.CPO.totalMSRP}
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
    <Analytics />
    </Box>
  );
};

export default DashboardLayout;
