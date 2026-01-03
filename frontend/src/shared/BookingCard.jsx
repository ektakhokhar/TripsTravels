import React from "react";
import BASE_URL from "../utils/config";
import { toast } from "react-toastify";

const BookingCard = ({ booking, onCancel }) => {
  const handleCancel = async () => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const res = await fetch(`${BASE_URL}/booking/${booking._id}`, {
        method: "DELETE",
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Booking cancelled");
        onCancel(booking._id); // remove from UI
      } else {
        toast.error(data.message);
      }
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <tr className="border-b">
      <td className="tableData font-semibold">{booking.tourName}</td>

      <td className="hidden md:table-cell tableData">
        {booking.maxGroupSize}
      </td>

      <td className="tableData">{booking.date}</td>

      <td className="tableData font-bold text-red-600">
        ₹{booking.totalPrice.toLocaleString("en-IN")}
      </td>

      <td className="tableData">
        <button
          onClick={handleCancel}
          className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default BookingCard;
