// ServicesCard.jsx
import React from "react";

const ServicesCard = ({ service }) => {
  const { title, description, icon } = service;

  return (
    <div className="
      group p-8 rounded-2xl bg-white shadow-lg border border-gray-100
      transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
    ">
      {/* Icon wrapper */}
      <div className="
        flex items-center justify-center w-14 h-14 mb-6 rounded-full
        bg-BaseColor/10 text-BaseColor text-4xl
        group-hover:bg-BaseColor group-hover:text-white transition-all duration-300
      ">
        {icon}
      </div>

      <h3 className="text-2xl font-semibold mb-2 text-gray-800 group-hover:text-BaseColor transition">
        {title}
      </h3>

      <p className="text-gray-600 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

export default ServicesCard;
