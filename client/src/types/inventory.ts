export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    condition: 'NEW' | 'USED' | 'CPO';
    msrp: number;
    dateAdded: string;
}

export interface InventoryStats {
    NEW: {
        count: number;
        totalMSRP: number;
        avgMSRP: number;
    };
    USED: {
        count: number;
        totalMSRP: number;
        avgMSRP: number;
    };
    CPO: {
        count: number;
        totalMSRP: number;
        avgMSRP: number;
    };
}

export interface DashboardState {
    vehicles: Vehicle[];
    recentData: Vehicle[];
    stats: InventoryStats;
    loading: boolean;
    error: string | null;
    filters: {
        make: string;
        duration: string;
    };
}
