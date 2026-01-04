import express from "express";
import {
  getAllTours,
  getSingleTour,
  createTour,
  updateTour,
  deleteTour,
  getTourBySearch,
  getFeaturedTour,
  getIndiaTours,
  getInternationalTours,
  getTourCount,
} from "../controllers/tourController.js";

const router = express.Router();

// MAIN ROUTE (THIS FIXES 500)
router.get("/", getAllTours);

// OTHER ROUTES
router.get("/search", getTourBySearch);
router.get("/featured", getFeaturedTour);
router.get("/india", getIndiaTours);
router.get("/international", getInternationalTours);
router.get("/count", getTourCount);
router.get("/:id", getSingleTour);

router.post("/", createTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

export default router;
