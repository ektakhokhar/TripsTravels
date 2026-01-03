import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import avatar from "../assets/images/avatar.jpg";
import { FaPeopleGroup, FaLocationDot } from "react-icons/fa6";
import { FaStar, FaMapPin, FaCity } from "react-icons/fa";
import CalculateAvg from "../utils/CalculateAvg";
import Booking from "../components/Booking/Booking";
import { toast } from "react-toastify";
import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";
import { AuthContext } from "../context/AuthContext";

/* ✅ PRICE FORMATTER */
const formatPrice = (amount) => `₹${Number(amount).toLocaleString("en-IN")}`;

const TourDetails = () => {
  const { user } = useContext(AuthContext);
  const reviewMsgRef = useRef();
  const [tourRating, setTourRating] = useState();
  const { id } = useParams();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  const { apiData: tour } = useFetch(`${BASE_URL}/tour/${id}`);

  const {
    title = "",
    photo = "",
    desc = "",
    price = "",
    reviews = [],
    city = "",
    distance = "",
    maxGroupSize = "",
    address = "",
  } = tour || {};

  const { avgRating } = CalculateAvg(reviews);
  const options = { day: "numeric", month: "long", year: "numeric" };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const reviewText = reviewMsgRef.current.value;

    try {
      if (!user) return toast.error("Please Sign In first");

      const response = await fetch(`${BASE_URL}/review/${id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: user.username,
          reviewText,
          rating: tourRating,
        }),
      });

      if (response.ok) window.location.reload();
      else toast.error("Something went wrong");
    } catch {
      toast.error("Server not responding");
    }
  };

  return (
    <section className="my-6 px-6 md:px-12">
      <div className="flex flex-col lg:flex-row gap-8">

        {/* LEFT SIDE */}
        <div className="flex-1">

          {/* IMAGE */}
          <div className="rounded-xl overflow-hidden shadow-lg">
           <img
  src={`${photo}?w=1200&auto=format&fit=crop&q=75`}
  alt={title}
  loading="lazy"
  className="w-full h-[420px] object-cover"
/>

          </div>

          {/* DETAILS CARD */}
          <div className="mt-8 bg-white rounded-xl shadow-md p-6 space-y-4">
            <h2 className="text-3xl font-bold text-BaseColor">{title}</h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-gray-700">
              <div className="flex items-center gap-2">
                <FaStar className="text-yellow-500" />
                <span>{avgRating || 0} ({reviews.length})</span>
              </div>
              <div className="flex items-center gap-2">
                <FaMapPin />
                <span>{address}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaCity />
                <span>{city}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaLocationDot />
                <span>{distance}</span>
              </div>
              <div className="flex items-center gap-2">
                <FaPeopleGroup />
                <span>{maxGroupSize} People</span>
              </div>
              <div className="font-semibold text-red-600">
                {formatPrice(price)} / per head
              </div>
            </div>

            <h3 className="text-xl font-semibold mt-4">Description</h3>
            <p className="text-gray-600 leading-relaxed">{desc}</p>
          </div>

          {/* REVIEWS */}
          <div className="mt-10">
            <h3 className="text-2xl font-bold mb-4">
              Reviews ({reviews.length})
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="flex gap-1 mb-3">
                {[1,2,3,4,5].map((num) => (
                  <FaStar
                    key={num}
                    onClick={() => setTourRating(num)}
                    className={`cursor-pointer ${
                      tourRating >= num ? "text-orange-600" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>

              <div className="flex gap-3 border border-BaseColor rounded-full px-4 py-2">
                <input
                  type="text"
                  ref={reviewMsgRef}
                  placeholder="Share your thoughts"
                  className="flex-1 outline-none"
                />
                <button className="bg-BaseColor text-white px-6 rounded-full">
                  Submit
                </button>
              </div>
            </form>

            {reviews.map((review) => (
              <div key={review._id} className="mt-4 p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <img src={avatar} className="w-10 h-10 rounded-full" />
                  <div>
                    <h5 className="font-semibold">{review.username}</h5>
                    <p className="text-sm text-gray-500">
                      {new Date(review.createdAt).toLocaleDateString("en-US", options)}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <p>{review.reviewText}</p>
                  <span className="flex items-center gap-1">
                    {review.rating} <FaStar className="text-yellow-500" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT SIDE – BOOKING */}
        <div className="w-full lg:w-[380px]">
          <Booking
            title={title}
            price={price}
            avgRating={avgRating}
            reviewsArray={reviews}
          />
        </div>
      </div>
    </section>
  );
};

export default TourDetails;
