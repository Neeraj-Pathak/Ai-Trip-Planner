import React, { useState } from 'react';
import LocationIQAutocomplete from '../components/components/custom/LocationIQAutocomplete';
import { Input } from '@/components/components/ui/input';
import { SelectBudget, SelectPeople } from '../constants/options';
import { Button } from '@/components/components/ui/button';
import toast from 'react-hot-toast';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/Firebase';
import { useNavigate } from 'react-router';
import './CreateTrip.css';

const CreateTrip = () => {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    destination: '',
    days: '',
    budget: '',
    people: ''
  });

  const navigate = useNavigate();

  const handlePlaceSelect = (selectedPlace) => {
    setPlace(selectedPlace);
    handleInputChange('destination', selectedPlace?.display_name || '');
  };

  const handleInputChange = (name, value) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const TripDetails = async (tripData, docId) => {
  const user = JSON.parse(localStorage.getItem('user')) || {};

  try {
    if (!tripData || typeof tripData !== 'object') {
      toast.error("Gemini returned invalid data.");
      return false;
    }

    if (tripData?.hotel_options) {
      tripData.hotel_options = tripData.hotel_options.map((hotel) => {
        delete hotel.image_url;
        return hotel;
      });
    }

    const dataToSave = {
      userSelection: formData,
      tripData,
      createdAt: new Date(),
      userId: user?.uid || 'guest',
    };

    const sizeInBytes = new Blob([JSON.stringify(dataToSave)]).size;
    if (sizeInBytes > 900000) {
      toast.error("Trip data too large to save to Firestore.");
      return false;
    }

    await setDoc(doc(db, "Trips", docId), dataToSave);
    toast.success("Trip saved to Firestore!");
    return true;
  } catch (err) {
    console.error("Firestore write error:", err);
    toast.error("Failed to save trip.");
    return false;
  }
};

  const handleGenerateTrip = async () => {
    const { destination, days, budget, people } = formData;
    if (!destination || !days || !budget || !people) {
      toast.error('Please fill out all fields to continue!');
      return;
    }

    const docId = Date.now().toString();
    const prompt = `
You are a professional travel planner. Return ONLY valid, well-structured JSON. Do NOT include any explanations.

Generate a personalized travel plan for:
- Location: ${destination}
- Duration: ${days} days
- People: ${people}
- Budget: ${budget}

Your response MUST follow this structure:

{
  "tripDetails": {
    "location": "Full destination name",
    "duration": "e.g., 4 days",
    "travelerType": "Solo / Couple / Family / Business",
    "bestTimeToVisit": "Month/season with reason"
  },
  "hotelOptions": [
    {
      "name": "Hotel Name",
      "address": "Full address",
      "price": "e.g., ₹3000–₹6000 per night",
      "rating": 4.5,
      "imageURL": "https://images.unsplash.com/...",
      "geoCoordinates": { "latitude": ..., "longitude": ... },
      "description": "1–2 line description of the hotel"
    },
    ...
    // Include at least 4 hotels
  ],
  "itinerary": [
    {
      "day": 1,
      "time": "9:00 AM",
      "placeName": "Name of place",
      "details": "Short explanation of what to do there",
      "ticketPricing": "e.g., ₹500 or Free",
      "travelTime": "e.g., 20 mins by metro",
      "bestTimeToVisit": "Morning / Afternoon / Evening",
      "imageURL": "https://images.unsplash.com/...",
      "geoCoordinates": { "latitude": ..., "longitude": ... }
    },
    ...
    // Include 4–6 entries per day with time slots (e.g., 9:00 AM, 11:00 AM, 1:00 PM, etc.)
  ],
  "placesToEat": A list of must-visit food places. Each should contain:
+   - "name"
+   - "description"
+   - "address"
+   - "imageURL" (must start with https://images.unsplash.com/)
+   - "geoCoordinates" (latitude, longitude)
+   - "famousDishes"
+   - "avgCostPerPerson"
+   - "bestTimeToVisit"
}

Rules:
- Image URLs must be valid Unsplash links.
- Use real and popular places and hotels in the selected destination.
- Time must follow format like "10:00 AM", "3:00 PM".
- Include diverse activities per day (e.g., sightseeing, dining, cultural, shopping).
- Do NOT repeat the same place in multiple time slots.
- Do NOT return anything other than the JSON.
`;


    setLoading(true);
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          }),
        }
      );

      const data = await res.json();
      if (data.candidates?.length > 0) {
        const reply = data.candidates[0].content.parts[0].text;
        let parsedData;
        try {
          const jsonMatch = reply.match(/\{[\s\S]*\}/);
          parsedData = JSON.parse(jsonMatch[0]);
        } catch (err) {
          toast.error("Gemini returned invalid JSON.");
          return;
        }

        const success = await TripDetails(parsedData, docId);
        if (success) navigate('/viewtrip/' + docId);
      } else {
        toast.error('Gemini returned no data.');
      }
    } catch (error) {
      toast.error('Failed to generate trip!');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="create-trip-container px-4 sm:px-10 md:px-20 lg:px-40 xl:px-56">
      <h2 className="section-title">Plan a New Adventure</h2>
      <p className="section-subtitle">Let’s begin with a few details to personalize your trip.</p>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Where would you like to go?</h2>
        <LocationIQAutocomplete onSelect={handlePlaceSelect} />
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-semibold mb-2">Trip Duration (in days):</h2>
        <Input
          type="number"
          placeholder="e.g., 3"
          min={1}
          max={30}
          value={formData.days}
          onChange={(e) => handleInputChange('days', e.target.value)}
        />
      </div>

      <h2 className='text-xl mt-10 my-3 font-medium'>What is your budget?</h2>
      <div className='grid grid-cols-1 md:grid-cols-5 gap-6'>
        {SelectBudget.map((item) => (
          <div
            key={item.id}
            className={`budget-option ${formData.budget === item.title ? 'selected' : ''}`}
            onClick={() => handleInputChange('budget', item.title)}
          >
            <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
              <span className="text-2xl">{item.icon}</span>
              <span>{item.title}</span>
            </div>
            <p className="text-sm text-gray-600 mb-2">{item.desc}</p>
            <div className="text-blue-600 font-bold">{item.amount}</div>
          </div>
        ))}
      </div>

      <h2 className='text-xl mt-10 my-3 font-medium'>How many people?</h2>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {SelectPeople.map((item, idx) => (
          <div
            key={idx}
            className={`people-option ${formData.people === item.title ? 'selected' : ''}`}
            onClick={() => handleInputChange('people', item.title)}
          >
            <div className="flex items-center gap-2 mb-2 text-lg font-semibold">
              <span className="text-2xl">{item.icon}</span>
              <span>{item.title}</span>
            </div>
            <p className="text-sm text-gray-600">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-end mt-10">
        <Button className="generate-button" onClick={handleGenerateTrip} disabled={loading}>
          {loading ? "Generating..." : "Generate Trip!"}
        </Button>
      </div>
    </div>
  );
};

export default CreateTrip;
