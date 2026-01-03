import React from "react";
import Slider from "react-slick";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import TourCard from "../../shared/TourCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

// Custom Arrow Component
const NextArrow = ({ onClick }) => {
  return (
    <div
      className="absolute right-[-20px] top-1/2 transform -translate-y-1/2 
                 bg-white shadow-lg w-10 h-10 rounded-full flex items-center 
                 justify-center cursor-pointer z-10 hover:scale-110 transition"
      onClick={onClick}
    >
      <FaChevronRight size={18} />
    </div>
  );
};

const PrevArrow = ({ onClick }) => {
  return (
    <div
      className="absolute left-[-20px] top-1/2 transform -translate-y-1/2 
                 bg-white shadow-lg w-10 h-10 rounded-full flex items-center 
                 justify-center cursor-pointer z-10 hover:scale-110 transition"
      onClick={onClick}
    >
      <FaChevronLeft size={18} />
    </div>
  );
};

const FeaturedTourList = () => {
  const { apiData: featuredToursData, error } = useFetch(
    `${BASE_URL}/tour/featured`
  );

  const sliderSettings = {
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 2500,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 480,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <>
      {error && <h4>{error}</h4>}

      {!error && (
        <div className="relative px-8"> 
          <Slider {...sliderSettings}>
            {featuredToursData?.map((tour) => (
              <div key={tour._id} className="px-3">
                <TourCard tour={tour} />
              </div>
            ))}
          </Slider>
        </div>
      )}
    </>
  );
};

export default FeaturedTourList;
