import { Request, Response } from "express";
import csv from "csv-parser";
import fs from "fs";
import path from "path";
import {
  startOfMonth,
  subMonths,
  startOfYear,
  subYears,
  parseISO,
  isAfter,
} from "date-fns";
import { Vehicle, InventoryFilters, InventoryStats } from "../types/inventory";

let cachedData: Vehicle[] = [];

const loadData = async (): Promise<Vehicle[]> => {
  if (cachedData.length > 0) return cachedData;

  return new Promise((resolve, reject) => {
    const results: Vehicle[] = [];
    fs.createReadStream(path.join(__dirname, "../../data/sample-data.csv"))
      .pipe(csv())
      .on("data", (data) => {
        results.push({
          ...data,
          year: parseInt(data.year),
          msrp: parseFloat(data.msrp),
          dateAdded: data.dateAdded,
          dealer: data.dealer,
        });
      })
      .on("end", () => {
        cachedData = results;
        resolve(results);
      })
      .on("error", reject);
  });
};

const filterByDuration = (data: Vehicle[], duration?: string): Vehicle[] => {
  if (!duration) return data;

  const now = new Date();
  let startDate: Date;

  switch (duration) {
    case "last_month":
      startDate = startOfMonth(subMonths(now, 1));
      break;
    case "this_month":
      startDate = startOfMonth(now);
      break;
    case "last_3_months":
      startDate = startOfMonth(subMonths(now, 3));
      break;
    case "last_6_months":
      startDate = startOfMonth(subMonths(now, 6));
      break;
    case "this_year":
      startDate = startOfYear(now);
      break;
    case "last_year":
      startDate = startOfYear(subYears(now, 1));
      break;
    default:
      return data;
  }

  return data.filter((vehicle) =>
    isAfter(parseISO(vehicle.dateAdded), startDate)
  );
};

const calculateStats = (
  vehicles: Vehicle[]
): Record<string, InventoryStats> => {
  const stats: Record<string, InventoryStats> = {
    NEW: { count: 0, totalMSRP: 0, avgMSRP: 0 },
    USED: { count: 0, totalMSRP: 0, avgMSRP: 0 },
    CPO: { count: 0, totalMSRP: 0, avgMSRP: 0 },
  };

  vehicles.forEach((vehicle) => {
    const condition = vehicle.condition;
    stats[condition].count++;
    stats[condition].totalMSRP += vehicle.msrp;
  });

  // Calculate averages
  Object.keys(stats).forEach((condition) => {
    if (stats[condition].count > 0) {
      stats[condition].avgMSRP =
        stats[condition].totalMSRP / stats[condition].count;
    }
  });

  return stats;
};

const getInventoryData = async (req: Request, res: Response) => {
  try {
    const { dealer, makes, duration } = req.query;
    const results: Vehicle[] = [];

    fs.createReadStream(path.join(__dirname, "../../data/sample-data.csv"))
      .pipe(csv())
      .on("data", (data) => {
        const vehicle = {
          id: data.id,
          make: data.make,
          model: data.model,
          year: parseInt(data.year),
          condition: data.condition,
          msrp: parseFloat(data.msrp),
          dateAdded: data.dateAdded,
          dealer: data.dealer,
        };
        results.push(vehicle);
      })
      .on("end", () => {
        let filteredData = results;

        // Add duration calculation
        const calculateCutoffDate = (duration: string) => {
          const now = new Date();
          switch(duration) {
            case 'last_month': return new Date(now.setMonth(now.getMonth() - 1));
            case 'last_3_months': return new Date(now.setMonth(now.getMonth() - 3));
            case 'last_6_months': return new Date(now.setMonth(now.getMonth() - 6));
            case 'this_year': return new Date(now.getFullYear(), 0, 1);
            case 'last_year': return new Date(now.getFullYear() - 1, 0, 1);
            default: return new Date(0);
          }
        };

        // Apply filters
        if (dealer) filteredData = filteredData.filter(v => v.dealer === dealer);
        if (makes) {
          const makeList = Array.isArray(makes) ? makes : [makes];
          filteredData = filteredData.filter(v => makeList.includes(v.make));
        }
        if (duration) {
          const cutoff = calculateCutoffDate(duration as string);
          filteredData = filteredData.filter(v => new Date(v.dateAdded) >= cutoff);
        }

        // Calculate stats
        const stats: InventoryStats = {
          NEW: { count: 0, totalMSRP: 0, avgMSRP: 0 },
          USED: { count: 0, totalMSRP: 0, avgMSRP: 0 },
          CPO: { count: 0, totalMSRP: 0, avgMSRP: 0 },
        };

        filteredData.forEach((vehicle) => {
          const condition = vehicle.condition;
          if (stats[condition]) {
            stats[condition].count++;
            stats[condition].totalMSRP += vehicle.msrp;
          }
        });

        // Calculate averages
        Object.keys(stats).forEach((condition) => {
          if (stats[condition].count > 0) {
            stats[condition].avgMSRP =
              stats[condition].totalMSRP / stats[condition].count;
          }
        });

        // Get unique dealers
        const dealers = Array.from(new Set(results.map((v) => v.dealer))).map(
          (dealer) => ({
            id: dealer,
            name: dealer,
          })
        );

        res.json({
          data: filteredData,
          stats,
          dealers,
        });
      });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Failed to fetch inventory data" });
  }
};

export const getInventory = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { make, duration } = req.query as InventoryFilters;
    let data = await loadData();

    // Apply filters
    if (make) {
      data = data.filter(
        (vehicle) => vehicle.make.toLowerCase() === make.toLowerCase()
      );
    }

    data = filterByDuration(data, duration);

    // Calculate statistics
    const stats = calculateStats(data);

    res.json({
      data,
      stats,
      recentData: data.slice(-5), // Last 5 entries
      totalCount: data.length,
    });
  } catch (error) {
    console.error("Error fetching inventory:", error);
    res.status(500).json({ error: "Failed to fetch inventory data" });
  }
};
