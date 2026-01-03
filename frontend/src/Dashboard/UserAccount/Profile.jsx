import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import BASE_URL from "../../utils/config";

const Profile = () => {
  const { user, token } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`${BASE_URL}/user/users/${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) toast.success("Profile updated");
      else toast.error(data.message);
    } catch {
      toast.error("Server error");
    }
  };

  return (
    <section className="min-h-screen bg-gray-50 flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow w-full max-w-md"
      >
        <h2 className="text-2xl font-bold text-red-600 mb-6 text-center">
          Edit Profile
        </h2>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          className="w-full mb-4 px-4 py-2 border rounded-lg"
          placeholder="Username"
          required
        />

        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full mb-6 px-4 py-2 border rounded-lg"
          placeholder="Email"
          required
        />

        <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700">
          Update Profile
        </button>
      </form>
    </section>
  );
};

export default Profile;
