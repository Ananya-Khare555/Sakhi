import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../firebase';
import { collection, setDoc, doc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

function SignUp() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // ✅ Store user data in Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        name,
        age,
        email: user.email,
        createdAt: new Date(),
      });

      navigate('/microsurvey');
    } catch (err) {
      setError(err.message);
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
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            required
          />
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
          <button type="submit">Sign Up</button>
          {error && <p className="error">{error}</p>}
        </form>
        <p>
          Already have an account?{' '}
          <span onClick={() => navigate('/signin')}>Sign In</span>
        </p>
      </div>
    </>
  );
}

export default SignUp;
