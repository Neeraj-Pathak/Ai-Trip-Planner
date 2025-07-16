import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../service/Firebase';
import { Link } from 'react-router-dom';
import GlobalAPI from '../service/GlobalAPI';

function MyTrips() {
  const [trips, setTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    if (!user?.uid) return;

    const fetchTrips = async () => {
      try {
        const q = query(collection(db, "Trips"), where("userId", "==", user.uid));
        const querySnapshot = await getDocs(q);
        const fetchedTrips = await Promise.all(
          querySnapshot.docs.map(async (doc) => {
            const data = doc.data();
            const location = data.tripData?.tripDetails?.location || data.userSelection?.destination;
            const image = await GlobalAPI.fetchPlaceImage(`${location} tourism landmark`);
            return {
              id: doc.id,
              ...data,
              imageURL: image || "/placeholder.jpg",
            };
          })
        );
        setTrips(fetchedTrips);
      } catch (err) {
        console.error("Failed to fetch user trips:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTrips();
  }, [user?.uid]);

  if (!user?.uid) return <p className="text-center text-gray-500">Please sign in to view your trips.</p>;

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6">🧳 My Trips</h2>
      {loading ? (
        <p>Loading your trips...</p>
      ) : trips.length === 0 ? (
        <p>No trips yet. Start planning one!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {trips.map((trip) => (
            <Link
              to={`/viewtrip/${trip.id}`}
              key={trip.id}
              className="block border rounded-lg bg-white shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={trip.imageURL || '/placeholder.jpg'}
                alt={trip.userSelection?.destination}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {trip.tripData?.tripDetails?.location || trip.userSelection?.destination}
                </h3>
                <p className="text-sm text-gray-600 mt-1">
                  {trip.tripData?.tripDetails?.duration || `${trip.userSelection?.days} Days`}
                </p>
                <p className="text-sm text-gray-600">
                  Budget: {trip.userSelection?.budget} • People: {trip.userSelection?.people}
                </p>
                <p className="text-xs text-gray-400 mt-2">
                  Created: {new Date(trip.createdAt.seconds * 1000).toLocaleString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default MyTrips;
