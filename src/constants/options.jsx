import { FaUser, FaHeart, FaUsers, FaUserFriends, FaSuitcaseRolling, FaMoneyBillWave, FaCrown } from 'react-icons/fa';
import { MdOutlineAttachMoney, MdWorkspacePremium, MdWork } from 'react-icons/md';
import { GiBackpack } from 'react-icons/gi';

export const SelectPeople = [
  {
    id: 1,
    title: 'Solo',
    desc: 'Traveling alone and exploring at your own pace',
    icon: '🧍',
    people: '1'
  },
  {
    id: 2,
    title: 'Couple',
    desc: 'Traveling with a partner for a romantic or relaxing trip',
    icon: '💑',
    people: '2'
  },
  {
    id: 3,
    title: 'Family',
    desc: 'Fun and bonding time with family members of all ages',
    icon: '👨‍👩‍👧‍👦',
    people: '3+'
  },
  {
    id: 4,
    title: 'Friends',
    desc: 'Exploring new places with friends and shared experiences',
    icon: '🧑‍🤝‍🧑',
    people: '2–6'
  },
  {
    id: 5,
    title: 'Group',
    desc: 'Large group tours or events',
    icon: '👥',
    people: '6+'
  },
  {
    id: 6,
    title: 'Business',
    desc: 'Work-related travel or meetings',
    icon: '💼',
    people: '1–4'
  }
];


export const SelectBudget = [
  {
    id: 1,
    title: 'Cheap',
    desc: 'Budget-friendly travel with essential accommodations, public transport, and simple meals.',
    icon: <FaMoneyBillWave className="text-green-600" />,
    amount: '₹3,000 – ₹7,000',
    bg: 'bg-green-100'
  },
  {
    id: 2,
    title: 'Moderate',
    desc: 'Balanced travel with decent hotels, guided tours, and a mix of comfort and affordability.',
    icon: <MdOutlineAttachMoney className="text-yellow-600" />,
    amount: '₹8,000 – ₹20,000',
    bg: 'bg-yellow-100'
  },
  {
    id: 3,
    title: 'Luxury',
    desc: 'Top-tier stays, fine dining, exclusive transport, and curated experiences for premium comfort.',
    icon: <FaCrown className="text-purple-600" />,
    amount: '₹25,000+',
    bg: 'bg-purple-100'
  },
  {
    id: 4,
    title: 'Backpacker',
    desc: 'Cost-effective travel with hostel stays, local street food, and cultural immersion.',
    icon: <GiBackpack className="text-blue-600" />,
    amount: '₹5,000 – ₹12,000',
    bg: 'bg-blue-100'
  },
  {
    id: 5,
    title: 'Business Class',
    desc: 'Corporate-grade travel with 4–5 star hotels, premium flights, and concierge services.',
    icon: <MdWorkspacePremium className="text-rose-600" />,
    amount: '₹30,000+',
    bg: 'bg-rose-100'
  }
];


export const AI_PROMPT='Generate Travel Plan for Location: {location}, for {totalDays} Days for {traveler} with a {budget} budget, give me hotels options list with hotelname, address,price, hotel image url, geo coord, rating, description and suggest itinerary with placename,details, place image url, geo coordintes, ticket pricing , travel time for [totalDats} days with each day plan with best time to visit in JSON format'