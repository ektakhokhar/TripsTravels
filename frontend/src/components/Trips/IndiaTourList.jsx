import React from "react";
import Slider from "react-slick";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import TourCard from "../../shared/TourCard";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const NextArrow = ({ onClick }) => (
  <button
    className="absolute right-[-20px] top-1/2 -translate-y-1/2 bg-white w-10 h-10 
    rounded-full shadow-lg flex items-center justify-center z-20"
    onClick={onClick}
  >
    <FaChevronRight />
  </button>
);

const PrevArrow = ({ onClick }) => (
  <button
    className="absolute left-[-20px] top-1/2 -translate-y-1/2 bg-white w-10 h-10 
    rounded-full shadow-lg flex items-center justify-center z-20"
    onClick={onClick}
  >
    <FaChevronLeft />
  </button>
);

const IndiaTourList = () => {
  const { apiData } = useFetch(`${BASE_URL}/tour/india`);
  console.log("INDIA TOURS DATA:", apiData);
  
const settings = {
  infinite: apiData?.length > 3,
  autoplay: apiData?.length > 1,
  autoplaySpeed: 2500,
  slidesToShow: Math.min(3, apiData?.length || 1),
  slidesToScroll: 1,
  speed: 600,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 2 } },
    { breakpoint: 768, settings: { slidesToShow: 1 } },
  ],
};

  return (
  <section className="py-16">
    {/* Curved Background Wrapper */}
    <div className="bg-[#061225] rounded-3xl mx-4 md:mx-8 lg:mx-16 py-16">
      
      <h2 className="text-3xl font-bold text-white text-center mb-10">
        Best Selling India Tour Packages
      </h2>

      <div className="relative max-w-7xl mx-auto px-4">
        <Slider {...settings}>
          {apiData?.map((tour) => (
            <div key={tour._id} className="px-3">
              <TourCard tour={tour} />
            </div>
          ))}
        </Slider>
      </div>

    </div>
  </section>
);

};

export default IndiaTourList;
