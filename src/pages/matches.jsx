import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const matches = [
  { name: 'Aditi', age: 22, location: 'Mumbai' },
  { name: 'Priya', age: 23, location: 'Delhi' },
  { name: 'Sneha', age: 21, location: 'Bangalore' }
];

const Matches = () => {
  const [index, setIndex] = useState(0);
  const [shortlisted, setShortlisted] = useState([]);
  const navigate = useNavigate();

  const handleShortlist = () => {
    setShortlisted([...shortlisted, matches[index]]);
    next();
  };

  const handleUnmatch = () => {
    next();
  };

  const next = () => {
    if (index < matches.length - 1) {
      setIndex(index + 1);
    } else {
      navigate('/final-choice', { state: { shortlisted } });
    }
  };

  if (index >= matches.length) return null;

  const current = matches[index];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2>{current.name}</h2>
        <p>{current.age} years old, from {current.location}</p>
        <div style={styles.buttons}>
          <button onClick={handleUnmatch} style={styles.unmatch}>👎 Unmatch</button>
          <button onClick={handleShortlist} style={styles.shortlist}>❤️ Shortlist</button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh',
    backgroundColor: '#f5f5f5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  card: {
    width: '300px',
    padding: '20px',
    backgroundColor: 'white',
    borderRadius: '10px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    textAlign: 'center'
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px'
  },
  shortlist: {
    padding: '10px 20px',
    backgroundColor: 'pink',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  },
  unmatch: {
    padding: '10px 20px',
    backgroundColor: '#ccc',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default Matches;
