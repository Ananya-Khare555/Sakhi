import React from 'react';
import { useNavigate } from 'react-router-dom';

const Welcome = () => {
  const navigate = useNavigate();

  const handleStart = () => {
    navigate('/auth');
  };

  return (
    <div style={styles.container}>
      <div style={styles.overlay}>
        <h1 style={styles.heading}>Welcome to Sakhi 👭</h1>
        <p style={styles.text}>Find your perfect roommate with voice-powered AI</p>
        <button style={styles.button} onClick={handleStart}>
          Get Started
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    background: 'linear-gradient(135deg, #ffdee9, #b5fffc)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
  },
  overlay: {
    background: 'rgba(255, 255, 255, 0.9)',
    padding: '40px',
    borderRadius: '12px',
    boxShadow: '0px 0px 15px rgba(0, 0, 0, 0.2)',
  },
  heading: {
    fontSize: '3rem',
    color: '#d63384',
    marginBottom: '20px',
  },
  text: {
    fontSize: '1.2rem',
    color: '#555',
    marginBottom: '30px',
  },
  button: {
    backgroundColor: '#d63384',
    color: 'white',
    padding: '12px 28px',
    fontSize: '1rem',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    transition: '0.3s ease',
  },
};

export default Welcome;
