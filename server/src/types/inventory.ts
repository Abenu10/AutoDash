export interface Vehicle {
    id: string;
    make: string;
    model: string;
    year: number;
    condition: 'NEW' | 'USED' | 'CPO';
    msrp: number;
    dateAdded: string;
    dealer: string;
}

export interface InventoryFilters {
    make?: string;
    duration?: 'last_month' | 'this_month' | 'last_3_months' | 'last_6_months' | 'this_year' | 'last_year';
    dealer?: string;
}

export interface StatItem {
    count: number;
    totalMSRP: number;
    avgMSRP: number;
}

export interface InventoryStats {
    NEW: StatItem;
    USED: StatItem;
    CPO: StatItem;
    [key: string]: StatItem;
}
