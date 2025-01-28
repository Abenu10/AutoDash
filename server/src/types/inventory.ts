export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    condition: 'NEW' | 'USED' | 'CPO';
    msrp: number;
    dateAdded: string;
}

export interface InventoryFilters {
    make?: string;
    duration?: 'last_month' | 'this_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'last_year';
}

export interface InventoryStats {
    count: number;
    totalMSRP: number;
    avgMSRP: number;
}
