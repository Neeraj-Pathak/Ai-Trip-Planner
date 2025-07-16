// PlaceCard.jsx
import React, { useEffect, useState } from 'react';
import GlobalAPI from '../../service/GlobalAPI';

function PlaceCard({ place }) {
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (!place.placeName) return;
    GlobalAPI.fetchPlaceImage(place.placeName).then((img) => {
      setImage(img);
    });
  }, [place.placeName]);

  return (
    <img
      src={image || '/places_placeholder.jpg'}
      alt={place.placeName}
      className="w-full h-[200px] object-cover rounded-lg"
      onError={(e) => (e.target.src = '/places_placeholder.jpg')}
    />
  );
}

export default PlaceCard;