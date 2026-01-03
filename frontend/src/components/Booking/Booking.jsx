import React, { useState, useContext, useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { toast } from "react-toastify";
import { AuthContext } from "../../context/AuthContext";
import BASE_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";

/* PRICE FORMATTER */
const formatPrice = (amount) =>
  `₹${Number(amount).toLocaleString("en-IN")}`;

const Booking = ({ price, title, reviewsArray = [], avgRating = 0 }) => {
  const currentDate = new Date().toISOString().split("T")[0];
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const [data, setData] = useState({
    userId: user?._id,
    tourName: title,
    fullName: "",
    phone: "",
    maxGroupSize: 1,
    date: "",
    totalPrice: price,
    bookAt: currentDate,
  });

  const calculatedPrice = Number(price) * Number(data.maxGroupSize);

  useEffect(() => {
    setData((prev) => ({
      ...prev,
      tourName: title,
      totalPrice: calculatedPrice,
    }));
  }, [title, calculatedPrice]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("Please login to book");
    }

    if (!/^\d{10}$/.test(data.phone)) {
      return toast.error("Phone number must be exactly 10 digits");
    }

    if (data.maxGroupSize < 1 || data.maxGroupSize > 10) {
      return toast.error("Maximum 10 people allowed");
    }

    try {
      const response = await fetch(`${BASE_URL}/booking`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          totalPrice: calculatedPrice,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        return toast.error(result.message || "Booking failed");
      }

      toast.success("🎉 Booking Successful!");
      navigate("/booked");
    } catch (error) {
      toast.error("Server not responding");
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-24">

      {/* PRICE HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-3xl font-bold text-red-600">
          {formatPrice(price)}
          <span className="text-base font-medium text-gray-600">
            {" "} / per person
          </span>
        </h3>

        <div className="flex items-center gap-1 text-yellow-500">
          <FaStar />
          <span className="text-gray-700">
            {avgRating} ({reviewsArray.length})
          </span>
        </div>
      </div>

      <h5 className="text-xl font-semibold mb-4">Booking Information</h5>

      <form onSubmit={handleSubmit} className="space-y-4">

        <input
          className="booking_input"
          type="text"
          placeholder="Full Name"
          id="fullName"
          required
          onChange={handleChange}
        />

        <input
          className="booking_input"
          type="text"
          placeholder="10-digit Phone Number"
          id="phone"
          maxLength={10}
          required
          onChange={(e) => {
            if (/^\d*$/.test(e.target.value)) handleChange(e);
          }}
        />

        <input
          className="booking_input"
          type="number"
          placeholder="Number of Persons (max 10)"
          id="maxGroupSize"
          min="1"
          max="10"
          required
          onChange={handleChange}
        />

        <input
          className="booking_input"
          type="date"
          id="date"
          min={currentDate}
          required
          onChange={handleChange}
        />

        {/* PRICE SUMMARY */}
        <div className="pt-6 space-y-3 border-t">
          <div className="flex justify-between">
            <span>Gross Price</span>
            <span>{formatPrice(price)}</span>
          </div>

          <div className="flex justify-between">
            <span>GST</span>
            <span>0%</span>
          </div>

          <div className="flex justify-between text-lg font-bold text-red-600">
            <span>Net Price</span>
            <span>{formatPrice(calculatedPrice)}</span>
          </div>
        </div>

        {/* ✅ ALWAYS VISIBLE BUTTON */}
        <button
          type="submit"
          className="w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-lg font-semibold mt-4"
        >
          Book Now
        </button>

      </form>
    </div>
  );
};

export default Booking;
