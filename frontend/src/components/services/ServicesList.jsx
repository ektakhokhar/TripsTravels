// ServicesList.jsx
import React from "react";
import ServicesCard from "./ServicesCard";
import { MdHotel } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";
import { IoMdBus } from "react-icons/io";

const ServicesList = () => {
  const services = [
    {
      title: "Adventure Tours",
      description: "Explore thrilling destinations with our guided adventure tours.",
      icon: <IoMdBus />,
    },
    {
      title: "Travel Planning",
      description: "Let us handle the details! We plan, you enjoy your dream vacation.",
      icon: <FaPlaneDeparture />,
    },
    {
      title: "High-Quality Accommodations",
      description: "Experience comfort and luxury with our carefully selected stays.",
      icon: <MdHotel />,
    },
  ];

  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Our Services
      </h2>
      <p className="text-gray-600 max-w-2xl mx-auto mb-12">
        We provide hassle-free travel experiences tailored to your needs.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {services.map((service, index) => (
          <ServicesCard key={index} service={service} />
        ))}
      </div>
    </div>
  );
};

export default ServicesList;
