import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../service/Firebase';
import InfoSection from './components/InfoSection';
import Hotels from './components/Hotels';
import PlacesToVisit from './components/PlacesToVisit';
import './ViewTrip.css'; // 👈 new CSS
import PlacesToEat from './components/PlacesToEat';


function ViewTrip() {
  const { tripId } = useParams();
  const [tripData, setTripData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const GetTripData = async () => {
      try {
        const docRef = doc(db, 'Trips', tripId); 
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setTripData(docSnap.data());
        } else {
          setTripData(null);
        }
      } catch (error) {
        console.error('Firestore fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    if (tripId) GetTripData();
  }, [tripId]);

return (
  <div className="viewtrip-container">
    {loading ? (
      <p>Loading trip...</p>
    ) : tripData ? (
      <>
        <div className="viewtrip-section animate">
          <InfoSection trip={tripData} />
        </div>

        <div className="viewtrip-section animate">
          <PlacesToVisit trip={tripData} />
        </div>


        <div className="viewtrip-section animate">
          <Hotels trip={tripData} />
        </div>

        
        <div className="viewtrip-section animate">
          <PlacesToEat trip={tripData} />
        </div>
      </>
    ) : (
      <p className="text-red-500 font-bold">Trip not found.</p>
    )}
  </div>
);

}

export default ViewTrip;
