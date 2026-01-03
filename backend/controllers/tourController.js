import Tour from "../models/Tour.js";

/* =========================
   GET ALL TOURS
========================= */
const getAllTours = async (req, res) => {
  const page = parseInt(req.query.page) || 0;

  try {
    const tours = await Tour.find()
      .sort({ createdAt: -1 })
      .populate("reviews")
      .skip(page * 12)
      .limit(12);

    res.status(200).json({
      success: true,
      data: tours,
      count: tours.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =========================
   GET SINGLE TOUR
========================= */
const getSingleTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id).populate("reviews");

    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      data: tour,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =========================
   CREATE TOUR
========================= */
const createTour = async (req, res) => {
  try {
    const {
      title,
      city,
      desc,
      photo,
      price,
      maxGroupSize,
      tourType,      // india / international
      featured,
    } = req.body;

    const newTour = new Tour({
      title,
      city,
      desc,
      photo,
      price,
      maxGroupSize,
      tourType,
      featured,
    });

    await newTour.save();

    res.status(201).json({
      success: true,
      message: "Tour created successfully",
      data: newTour,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =========================
   UPDATE TOUR
========================= */
const updateTour = async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updatedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour updated successfully",
      data: updatedTour,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =========================
   DELETE TOUR
========================= */
const deleteTour = async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);

    if (!deletedTour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    res.status(200).json({
      success: true,
      message: "Tour deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =========================
   SEARCH TOUR
========================= */
const getTourBySearch = async (req, res) => {
  try {
    const search = req.query.search || "";
    const minPrice = Number(req.query.minPrice) || 0;
    const maxPrice = Number(req.query.maxPrice) || 999999;

    const tours = await Tour.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } },
      ],
      price: { $gte: minPrice, $lte: maxPrice },
    });

    res.status(200).json({
      success: true,
      data: tours,
      count: tours.length,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =========================
   FEATURED TOURS
========================= */
const getFeaturedTour = async (req, res) => {
  try {
    const tours = await Tour.find({ featured: true }).limit(12);

    res.status(200).json({
      success: true,
      data: tours,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =========================
   INDIA TOURS
========================= */
const getIndiaTours = async (req, res) => {
  try {
    const tours = await Tour.find({ tourType: "india" });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =========================
   INTERNATIONAL TOURS
========================= */
const getInternationalTours = async (req, res) => {
  try {
    const tours = await Tour.find({ tourType: "international" });
    res.status(200).json(tours);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

/* =========================
   TOUR COUNT
========================= */
const getTourCount = async (req, res) => {
  try {
    const count = await Tour.countDocuments();
    res.status(200).json({ success: true, data: count });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export {
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
};
