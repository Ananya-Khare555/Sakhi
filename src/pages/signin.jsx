import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // 🔐 Try to sign in
      await signInWithEmailAndPassword(auth, email, password);
      navigate('/microsurvey');
    } catch (err) {
      // 🔥 If user doesn't exist
      if (err.code === 'auth/user-not-found') {
        setError('User not found. Please sign up first.');
      } else if (err.code === 'auth/wrong-password') {
        setError('Incorrect password.');
      } else {
        setError(err.message);
      }
    }
  };

  return (
    <>
      <style>{`
        .auth-container {
          max-width: 400px;
          margin: 100px auto;
          padding: 2rem;
          background: #fefefe;
          border: 1px solid #ccc;
          border-radius: 8px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
        }
        .auth-container input {
          width: 100%;
          margin: 10px 0;
          padding: 10px;
          border: 1px solid #ccc;
          border-radius: 5px;
          font-size: 16px;
        }
        .auth-container button {
          padding: 10px 20px;
          background-color: #20c997;
          border: none;
          border-radius: 5px;
          color: white;
          cursor: pointer;
          font-size: 16px;
          margin-top: 10px;
        }
        .auth-container .error {
          color: red;
          margin-top: 10px;
          font-size: 14px;
        }
        .auth-container p span {
          color: #007bff;
          cursor: pointer;
          text-decoration: underline;
        }
      `}</style>

      <div className="auth-container">
        <h2>Sign In</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button type="submit">Sign In</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          Don't have an account?{' '}
          <span onClick={() => navigate('/signup')}>Sign Up</span>
        </p>
      </div>
    </>
  );
}

export default SignIn;
