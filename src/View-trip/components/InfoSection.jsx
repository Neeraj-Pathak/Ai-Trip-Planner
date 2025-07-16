import React, { useEffect, useState } from 'react';
import GlobalAPI from '../../service/GlobalAPI';
import '../ViewTrip.css';

function InfoSection({ trip }) {
  const [image, setImage] = useState(null);

  const {
    destination,
    days,
    budget,
    people
  } = trip?.userSelection || {};

  const {
    location,
    duration,
    travelerType,
    bestTimeToVisit
  } = trip?.tripData?.tripDetails || {};

  useEffect(() => {
    const placeQuery = `${location || destination} tourism landmark`;
    if (placeQuery.trim()) {
      GlobalAPI.fetchPlaceImage(placeQuery).then(setImage);
    }
  }, [location, destination]);

  return (
    <div className="info-section card">
      <img
        src={image || '/placeholder.jpg'}
        alt={location || destination}
        onError={(e) => (e.target.src = '/placeholder.jpg')}
      />
      <div className="p-6 space-y-2">
        <h2 className="font-bold text-2xl text-gray-800">
          {location || destination}
        </h2>
        <div className="tags">
          <span>{duration || `${days} Days`}</span>
          <span>{budget} Budget</span>
          <span>For: {travelerType || people}</span>
          {bestTimeToVisit && <span>Best Time: {bestTimeToVisit}</span>}
        </div>
      </div>
    </div>
  );
}

export default InfoSection;