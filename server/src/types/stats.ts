export interface VehicleStats {
  count: number;
  msrp: number;
  avgMsrp: number;
}

export interface DashboardStats {
  new: VehicleStats;
  used: VehicleStats;
  cpo: VehicleStats;
}

export interface StatsResponse {
  stats: DashboardStats;
  error?: string;
}
