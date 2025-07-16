import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { auth } from "../../../service/Firebase";
import { onAuthStateChanged, signOut } from 'firebase/auth';
import './Header.css';

function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsub();
  }, []);

  const handleSignOut = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('user');
      window.location.href = '/';
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <header className="app-header">
      <Link to="/" className="navbar-brand">AI Trip Planner</Link>
      <ul className="navbar-nav">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/create-trip">Create Trip</Link></li>
        <li><Link to="/my-trips">My Trips</Link></li>
        <li>
          {user ? (
            <div className="user-profile">
              <span className="username">{user.displayName || user.email}</span>
              <button className="signin-button" onClick={handleSignOut}>Sign Out</button>
            </div>
          ) : (
            <Link to="/signin">
              <button className="signin-button">Sign In</button>
            </Link>
          )}
        </li>
      </ul>
    </header>
  );
}

export default Header;
