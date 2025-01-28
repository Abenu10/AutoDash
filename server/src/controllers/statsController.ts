import { Request, Response } from 'express';
import { DashboardStats } from '../types/stats';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export const getStats = async (req: Request, res: Response) => {
  try {
    const stats: DashboardStats = {
      new: { count: 0, msrp: 0, avgMsrp: 0 },
      used: { count: 0, msrp: 0, avgMsrp: 0 },
      cpo: { count: 0, msrp: 0, avgMsrp: 0 }
    };

    const results: any[] = [];
    
    // Read from sample data CSV
    fs.createReadStream(path.join(__dirname, '../../data/sample-data.csv'))
      .pipe(csv())
      .on('data', (data) => {
        results.push(data);
      })
      .on('end', () => {
        // Process the data
        results.forEach(vehicle => {
          const condition = vehicle.condition?.toLowerCase() || '';
          const msrp = parseFloat(vehicle.msrp) || 0;

          if (condition === 'new') {
            stats.new.count++;
            stats.new.msrp += msrp;
          } else if (condition === 'used') {
            stats.used.count++;
            stats.used.msrp += msrp;
          } else if (condition === 'cpo') {
            stats.cpo.count++;
            stats.cpo.msrp += msrp;
          }
        });

        // Calculate averages
        stats.new.avgMsrp = stats.new.count ? stats.new.msrp / stats.new.count : 0;
        stats.used.avgMsrp = stats.used.count ? stats.used.msrp / stats.used.count : 0;
        stats.cpo.avgMsrp = stats.cpo.count ? stats.cpo.msrp / stats.cpo.count : 0;

        res.json({ stats });
      });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Failed to fetch stats' });
  }
};
