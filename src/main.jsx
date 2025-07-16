import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import App from './App.jsx';
import CreateTrip from './Create-trip/index.jsx';
import ViewTrip from './View-trip';
import Layout from './components/Layout.jsx'; // new layout
import SignIn from "./components/components/custom/SignIn";
import MyTrips from './My-trips/MyTrips';


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />, // layout includes Header + Outlet
    children: [
      { path: '/', element: <App /> },
      { path: '/create-trip', element: <CreateTrip /> },
      { path: '/viewtrip/:tripId', element: <ViewTrip /> },
      { path: '/signin', element: <SignIn /> }, // ✅ Add this      
      { path: '/my-trips', element: <MyTrips /> }, // ✅ New route    
    ],
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
