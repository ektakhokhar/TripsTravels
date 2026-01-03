import React, { useRef } from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoIosPricetags, IoIosSearch } from "react-icons/io";
import { toast } from "react-toastify";
import BASE_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";

const SearchBar = () => {
  const minPriceRef = useRef();
  const maxPriceRef = useRef();
  const cityRef = useRef();
  const navigate = useNavigate();

  const SubmitHandler = async (e) => {
    e.preventDefault(); // prevent refresh

    const minPrice = minPriceRef.current.value.trim();
    const maxPrice = maxPriceRef.current.value.trim();
    const searchTerm = cityRef.current.value.trim();

    if (!minPrice || !maxPrice || !searchTerm) {
      toast.error("Please fill all the fields");
      return;
    }

    try {
      const response = await fetch(
        `${BASE_URL}/tour/search?search=${searchTerm}&minPrice=${minPrice}&maxPrice=${maxPrice}`
      );

      const result = await response.json();

      if (!response.ok) {
        toast.error("No Record Found!");
      }

      navigate(
        `/tours/search?search=${searchTerm}&minPrice=${minPrice}&maxPrice=${maxPrice}`,
        { state: result.data }
      );
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <div className="flex justify-center w-full">
      <form
        onSubmit={SubmitHandler}
        className="bg-white/20 backdrop-blur-xl shadow-lg rounded-3xl px-6 py-4 flex flex-col md:flex-row md:items-center gap-4 w-full max-w-3xl"
      >
        {/* Location */}
        <div className="flex items-center gap-3 w-full md:border-r md:border-gray-300 pr-4">
          <FaLocationDot className="text-BaseColor text-2xl" />
          <div className="w-full">
            <label className="text-white text-sm">Location</label>
            <input
              ref={cityRef}
              type="text"
              placeholder="Where to?"
              className="w-full bg-transparent text-white placeholder-gray-200 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Min Price */}
        <div className="flex items-center gap-3 w-full md:border-r md:border-gray-300 pr-4">
          <IoIosPricetags className="text-BaseColor text-2xl" />
          <div className="w-full">
            <label className="text-white text-sm">Min Price</label>
            <input
              ref={minPriceRef}
              type="number"
              placeholder="₹ Min"
              className="w-full bg-transparent text-white placeholder-gray-200 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Max Price */}
        <div className="flex items-center gap-3 w-full">
          <IoIosPricetags className="text-BaseColor text-2xl" />
          <div className="w-full">
            <label className="text-white text-sm">Max Price</label>
            <input
              ref={maxPriceRef}
              type="number"
              placeholder="₹ Max"
              className="w-full bg-transparent text-white placeholder-gray-200 focus:outline-none text-sm"
            />
          </div>
        </div>

        {/* Search Button */}
        <button
          type="submit"
          className="bg-BaseColor flex justify-center items-center gap-2 rounded-full py-3 px-6 text-white font-semibold hover:opacity-90 transition-all w-full md:w-auto"
        >
          <IoIosSearch size={22} />
          Search
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
