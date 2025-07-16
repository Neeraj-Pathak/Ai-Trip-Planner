import React from "react";
import { motion } from "framer-motion";
import "../ViewTrip.css";

function Hotels({ trip }) {
  const hotels = trip?.tripData?.hotelOptions;

  if (!hotels || !Array.isArray(hotels)) {
    return <p className="text-gray-500">No hotels found for this trip.</p>;
  }

  return (
    <div className="mt-10">
      <h2 className="section-title">🏨 Hotel Recommendations</h2>

      <div className="horizontal-scroll-wrapper">
        {hotels.map((hotel, index) => (
          <motion.a
            key={index}
            href={`https://www.google.com/maps/search/?api=1&query=${hotel.name}+${hotel.address}`}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="hotel-slide-card"
          >
            <div className="p-5 space-y-2">
              <h3 className="text-xl font-semibold text-gray-800">{hotel.name}</h3>
              <p className="text-sm text-gray-600">📍 {hotel.address}</p>
              <p className="text-sm text-gray-600">💰 {hotel.price}</p>
              <p className="text-sm text-yellow-600 font-medium">⭐ {hotel.rating}</p>
              <p className="text-sm text-gray-700">{hotel.description}</p>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
