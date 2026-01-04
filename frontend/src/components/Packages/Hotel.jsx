import useFetch from "../hooks/useFetch";
import BASE_URL from "../utils/config";

const Hotel = () => {
  const {
    apiData: hotels,
    loading,
    error,
  } = useFetch(`${BASE_URL}/hotel`);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#061225] text-white">
        Loading Hotels...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#061225] text-red-400">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#061225] min-h-screen px-6 py-12">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-white text-center mb-3">
        Hotels & Accommodations
      </h1>
      <p className="text-center text-gray-300 mb-12">
        Find the best places to stay during your journey
      </p>

      {/* Hotel Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {hotels.map((hotel) => (
          <div
            key={hotel._id}
            className="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-[1.02] transition duration-300"
          >
            {/* Image */}
            <img
              src={hotel.photo}
              alt={hotel.name}
              loading="lazy"
              className="h-52 w-full object-cover"
            />

            {/* Content */}
            <div className="p-5">
              <h2 className="text-xl font-semibold text-gray-800">
                {hotel.name}
              </h2>
              <p className="text-sm text-gray-500 mb-2">
                📍 {hotel.city}
              </p>

              <p className="text-sm text-gray-600 line-clamp-2">
                {hotel.desc}
              </p>

              <div className="flex justify-between items-center mt-4">
                <span className="text-lg font-bold text-blue-600">
                  ₹{hotel.price}
                  <span className="text-sm text-gray-500"> / night</span>
                </span>
                <span className="text-yellow-500 font-semibold">
                  ⭐ {hotel.rating}
                </span>
              </div>

              <button className="mt-5 w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition">
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Hotel;
