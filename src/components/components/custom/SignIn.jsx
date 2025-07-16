import React, { useState } from 'react';
import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import './SignIn.css'; // Optional: for custom styles
import { FcGoogle } from 'react-icons/fc';

function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const auth = getAuth();

  const handleEmailSignIn = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      console.log('Email Login Success:', user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/'); // redirect after login
    } catch (error) {
      console.error('Email Sign-In Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      console.log('Google Login Success:', user);
      localStorage.setItem('user', JSON.stringify(user));
      navigate('/');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signin-container">
      <form onSubmit={handleEmailSignIn} className="signin-form">
        <h2>Sign In</h2>
        <input
          type="email"
          placeholder="Email address"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In with Email'}
        </button>

        <div className="divider">OR</div>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="google-button"
          disabled={loading}
        >
          <FcGoogle size={20} className="icon" />
          Sign in with Google
        </button>
      </form>
    </div>
  );
}

export default SignIn;
