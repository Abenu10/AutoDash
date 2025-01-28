import { Request, Response } from 'express';
import fs from 'fs';
import path from 'path';
import csv from 'csv-parser';

export const getDealers = async (req: Request, res: Response) => {
  try {
    const dealers = new Set();
    
    fs.createReadStream(path.join(__dirname, '../../data/sample-data.csv'))
      .pipe(csv())
      .on('data', (data) => {
        if (data.dealer) {
          dealers.add(data.dealer);
        }
      })
      .on('end', () => {
        res.json({ 
          dealers: Array.from(dealers).map(dealer => ({
            id: dealer,
            name: dealer
          }))
        });
      });
  } catch (error) {
    console.error('Error fetching dealers:', error);
    res.status(500).json({ error: 'Failed to fetch dealers' });
  }
};
