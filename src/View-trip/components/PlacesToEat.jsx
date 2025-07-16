import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import GlobalAPI from '../../service/GlobalAPI';
import '../ViewTrip.css';

function PlacesToEat({ trip }) {
  const placesToEat = trip?.tripData?.placesToEat || [];

  if (!Array.isArray(placesToEat) || placesToEat.length === 0) {
    return <p className="text-gray-500">No food places available for this trip.</p>;
  }

  return (
    <div className="pt-10">
      <h2 className="section-title">🍽️ Best Places to Eat</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {placesToEat.map((place, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="food-card"
          >
            <img
              src={place.imageURL || '/places_placeholder.jpg'}
              alt={place.name}
              className="rounded-t-lg h-48 w-full object-cover"
              onError={(e) => (e.target.src = '/places_placeholder.jpg')}
            />
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-bold text-gray-800">{place.name}</h3>
              <p className="text-gray-600 text-sm">{place.description}</p>
              <ul className="text-sm text-gray-700 space-y-1">
                <li><span className="font-medium">🍲 Dishes:</span> {place.famousDishes}</li>
                <li><span className="font-medium">💸 Avg Cost:</span> {place.avgCostPerPerson}</li>
                <li><span className="font-medium">🕒 Best Time:</span> {place.bestTimeToVisit}</li>
              </ul>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.name},${place.geoCoordinates.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-3 text-blue-600 hover:underline text-sm"
              >
                View on Map 📍
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default PlacesToEat;
