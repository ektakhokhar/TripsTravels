import React, { useContext, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import useFetch from "../../hooks/useFetch";
import BASE_URL from "../../utils/config";
import { useNavigate } from "react-router-dom";

const MyAccount = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const { apiData: bookings } = useFetch(
    `${BASE_URL}/booking/${user._id}`
  );

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <section className="py-10 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6 px-4">

        {/* LEFT : PROFILE */}
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-red-600 mb-4">
            My Profile
          </h3>

          <p className="mb-2">
            <strong>Username:</strong> {user.username}
          </p>
          <p className="mb-2">
            <strong>Email:</strong> {user.email}
          </p>
          <p className="mb-6">
            <strong>Role:</strong> User
          </p>

          <button
            onClick={() => navigate("/profile")}
            className="w-full mb-3 py-2 border border-red-500 text-red-600 rounded-lg hover:bg-red-50"
          >
            Edit Profile
          </button>

          <button
            onClick={() => navigate("/my-account")}
            className="w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            My Bookings
          </button>
        </div>

        {/* RIGHT : BOOKINGS */}
        <div className="md:col-span-2 bg-white rounded-xl shadow p-6">
          <h3 className="text-xl font-bold text-red-600 mb-4">
            My Bookings
          </h3>

          {bookings?.length === 0 && (
            <p>No bookings found.</p>
          )}

          <div className="space-y-4">
            {bookings?.map((item) => (
              <div
                key={item._id}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <h4 className="font-semibold">
                    {item.tourName}
                  </h4>
                  <p className="text-sm text-gray-600">
                    Date: {item.date} | Persons: {item.maxGroupSize}
                  </p>
                  <p className="text-sm text-gray-600">
                    Phone: {item.phone}
                  </p>
                </div>

                <p className="font-bold text-red-600">
                  ₹{item.totalPrice.toLocaleString("en-IN")}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};

export default MyAccount;
