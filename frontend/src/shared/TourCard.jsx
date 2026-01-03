import React from "react";
import { Link } from "react-router-dom";
import { FaStar } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";

const TourCard = ({ tour }) => {
  const { photo, title, city, price, desc, _id, reviews, featured } = tour;
  const { avgRating } = CalculateAvg(reviews);

  return (
    <div
      data-aos="fade-up" // 👈 smooth slide-up animation
     className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col 
           hover:shadow-2xl hover:-translate-y-2 transform transition-all duration-300 
           w-[260px] md:w-[280px] cursor-pointer"

    >
      {/* IMAGE */}
      <div className="relative">
        <img
  src={`${photo}?w=400&auto=format&fit=crop&q=70`}
  alt={title}
  loading="lazy"
  className="w-full h-36 object-cover transition-transform duration-500 hover:scale-110"
/>

        {featured && (
          <span className="absolute top-3 right-3 bg-gradient-to-r from-BaseColor to-BHoverColor text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md">
            Featured
          </span>
        )}
      </div>

      {/* CONTENT */}
      <div className="p-4 flex flex-col flex-grow justify-between">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">{city}</span>
          <div className="flex items-center text-yellow-500 gap-1">
            <FaStar className="text-xs" />
            <span className="text-xs text-gray-700">
              {avgRating || 0} <span className="text-gray-500">({reviews.length})</span>
            </span>
          </div>
        </div>

        <Link
          to={`/tours/${_id}`}
          className="text-base font-bold text-gray-900 hover:text-BaseColor transition-colors line-clamp-1"
        >
          {title}
        </Link>

        <p className="text-xs text-gray-600 mt-1 line-clamp-2">{desc}</p>
      </div>

      {/* FOOTER */}
      <div className="flex items-center justify-between p-4 border-t">
        <div>
          <p className="text-[11px] text-gray-500">Starts from</p>
          <p className="text-base font-bold text-BaseColor">₹{price}</p>
        </div>
        <Link
          to={`/tours/${_id}`}
          className="bg-BaseColor text-white text-xs font-semibold px-3 py-1.5 rounded-full hover:bg-BHoverColor transition-colors"
        >
          Book Now
        </Link>
      </div>
    </div>
  );
};

export default TourCard;
