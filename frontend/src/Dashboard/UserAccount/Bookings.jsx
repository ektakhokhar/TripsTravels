import React, { useContext, useState, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import { AuthContext } from "../../context/AuthContext";
import BookingCard from "../../shared/BookingCard";

const Bookings = () => {
  const { user } = useContext(AuthContext);
  const { apiData } = useFetch(`${BASE_URL}/booking/${user._id}`);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    if (apiData) setBookings(apiData);
  }, [apiData]);

  const handleCancel = (id) => {
    setBookings((prev) => prev.filter((b) => b._id !== id));
  };

  if (bookings.length === 0) {
    return <p>No bookings found.</p>;
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full table-auto border-collapse border">
        <thead className="bg-gray-100">
          <tr>
            <th className="tableData">Tour</th>
            <th className="hidden md:table-cell tableData">Persons</th>
            <th className="tableData">Date</th>
            <th className="tableData">Price</th>
            <th className="tableData">Action</th>
          </tr>
        </thead>

        <tbody>
          {bookings.map((booking) => (
            <BookingCard
              key={booking._id}
              booking={booking}
              onCancel={handleCancel}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Bookings;
