import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import PlaceCard from './PlaceCard';
import '../ViewTrip.css';

function PlacesToVisit({ trip }) {
  const itinerary = trip?.tripData?.itinerary || [];

  const groupedByDay = itinerary.reduce((acc, item) => {
    const day = parseInt(item.day);
    if (!acc[day]) acc[day] = [];
    acc[day].push(item);
    return acc;
  }, {});

  for (const day in groupedByDay) {
    groupedByDay[day].sort((a, b) => {
      const parseTime = (str) => {
        const [time, meridiem] = str.split(' ');
        let [hours, minutes] = time.split(':').map(Number);
        if (meridiem === 'PM' && hours !== 12) hours += 12;
        if (meridiem === 'AM' && hours === 12) hours = 0;
        return hours * 60 + minutes;
      };
      return parseTime(a.time) - parseTime(b.time);
    });
  }

  const totalDays = Object.keys(groupedByDay).length;
  const [currentDay, setCurrentDay] = useState(1);
  const currentDayPlaces = groupedByDay[currentDay] || [];

  return (
    <div className="pt-10">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">📍 Day {currentDay} Plan</h2>
        <div className="flex gap-3">
          <button
            className={`px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 transition-all ${
              currentDay === 1 ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setCurrentDay((prev) => Math.max(1, prev - 1))}
            disabled={currentDay === 1}
          >
            ⬅ Previous
          </button>
          <button
            className={`px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-all ${
              currentDay === totalDays ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            onClick={() => setCurrentDay((prev) => Math.min(totalDays, prev + 1))}
            disabled={currentDay === totalDays}
          >
            Next ➡
          </button>
        </div>
      </div>

      <div className="place-grid">
        {currentDayPlaces.map((place, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: idx * 0.1 }}
            whileHover={{ scale: 1.02 }}
            className="card p-4 flex flex-col md:flex-row gap-5"
          >
            <div className="w-full md:w-1/3">
              <PlaceCard place={place} />
            </div>
            <div className="flex flex-col justify-between w-full">
              <div>
                <p className="text-sm text-green-500 mb-1">🕒 {place.time}</p>
                <h3 className="text-lg font-semibold text-gray-800">{place.placeName}</h3>
                <p className="text-sm text-gray-700">{place.details}</p>
                <div className="mt-2 text-sm text-gray-600 space-y-1">
                  <p>🗓 Best Time: {place.bestTimeToVisit}</p>
                  <p>🎟 Ticket: {place.ticketPricing}</p>
                  <p>🚗 Travel: {place.travelTime}</p>
                </div>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${place.placeName},${place.geoCoordinates.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-sm mt-3 hover:underline"
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

export default PlacesToVisit;