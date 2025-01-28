import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { DashboardState, Vehicle, InventoryStats } from '../../types/inventory';
import { endpoints } from '../../utils/api';

const initialState: DashboardState = {
  vehicles: [],
  recentData: [],
  stats: {
    NEW: { count: 0, totalMSRP: 0, avgMSRP: 0 },
    USED: { count: 0, totalMSRP: 0, avgMSRP: 0 },
    CPO: { count: 0, totalMSRP: 0, avgMSRP: 0 }
  },
  loading: false,
  error: null,
  filters: {
    dealer: '',
    make: [],
    duration: ''
  }
};

interface FetchInventoryParams {
  dealer?: string;
  make?: string[];
  duration?: string;
}

export const fetchInventoryData = createAsyncThunk(
  'dashboard/fetchInventoryData',
  async (params: FetchInventoryParams = {}, { getState }) => {
    const state = getState() as { dashboard: DashboardState };
    const { dealer, make, duration } = state.dashboard.filters;
    
    const queryParams = new URLSearchParams();
    if (dealer) queryParams.append('dealer', dealer);
    if (make?.length) queryParams.append('make', make.join(','));
    if (duration) queryParams.append('duration', duration);
    
    const response = await axios.get(`${endpoints.inventory}?${queryParams}`);
    return response.data;
  }
);

const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<{ dealer?: string; make?: string[]; duration?: string }>) => {
      state.filters = { ...state.filters, ...action.payload };
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchInventoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInventoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.vehicles = action.payload.data || [];
        state.recentData = action.payload.recentData || [];
        state.stats = action.payload.stats || {
          NEW: { count: 0, totalMSRP: 0, avgMSRP: 0 },
          USED: { count: 0, totalMSRP: 0, avgMSRP: 0 },
          CPO: { count: 0, totalMSRP: 0, avgMSRP: 0 }
        };
      })
      .addCase(fetchInventoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch inventory data';
      });
  }
});

export const { setFilters } = dashboardSlice.actions;
export default dashboardSlice.reducer;