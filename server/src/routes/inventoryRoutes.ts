import express from "express";
import { getInventory } from "../controllers/inventoryController";

const router = express.Router();

/**
 * @route   GET /api/inventory
 * @desc    Get inventory data with optional filters
 * @query   make - Filter by vehicle make
 * @query   duration - Filter by time period (last_month, this_month, last_3_months, last_6_months, this_year, last_year)
 * @access  Public
 */
router.get("/", getInventory);

export default router;
