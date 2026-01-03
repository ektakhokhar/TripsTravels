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

const InternationalTourList = () => {
  const { apiData } = useFetch(`${BASE_URL}/tour/international`);

 const settings = {
  infinite: apiData?.length > 4,
  autoplay: apiData?.length > 1,
  autoplaySpeed: 2500,
  slidesToShow: Math.min(4, apiData?.length || 1),
  slidesToScroll: 1,
  speed: 600,
  arrows: true,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    { breakpoint: 1024, settings: { slidesToShow: 3 } },
    { breakpoint: 768, settings: { slidesToShow: 2 } },
    { breakpoint: 480, settings: { slidesToShow: 1 } },
  ],
};


  return (
    <div className="py-10 ">
      <h2 className="text-2xl font-bold mb-5">Best Selling International Holiday Packages</h2>

      <div className="relative max-w-7xl mx-auto ">

        <Slider {...settings}>
          {apiData?.map((tour) => (
            <div key={tour._id} className="px-3">
              <TourCard tour={tour} />
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default InternationalTourList;
