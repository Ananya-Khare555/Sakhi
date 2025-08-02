import React, { useEffect, useState } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const MatchCards = () => {
  const [matches, setMatches] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [shortlisted, setShortlisted] = useState([]);
  const [unmatched, setUnmatched] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMatches = async () => {
      const querySnapshot = await getDocs(collection(db, 'microSurveyResponses'));
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push({ id: doc.id, ...doc.data() });
      });
      setMatches(users);
    };

    fetchMatches();
  }, []);

  const handleChoice = (choice) => {
    const current = matches[currentIndex];
    if (choice === 'shortlist') {
      setShortlisted([...shortlisted, current]);
    } else {
      setUnmatched([...unmatched, current]);
    }
    setCurrentIndex(currentIndex + 1);
  };

  const currentCard = matches[currentIndex];

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Your Roommate Matches</h2>
      {currentCard ? (
        <div style={styles.card}>
          <h3>{currentCard.email}</h3>
          <p><strong>Cleanliness:</strong> {currentCard.responses?.cleanliness}</p>
          <p><strong>Sleep Schedule:</strong> {currentCard.responses?.sleepSchedule}</p>
          <p><strong>Social Level:</strong> {currentCard.responses?.socialLevel}</p>
          <p><strong>Work Hours:</strong> {currentCard.responses?.workHours}</p>
          <p><strong>Noise Level:</strong> {currentCard.responses?.noiseLevel}</p>
          <div style={styles.buttonGroup}>
            <button style={styles.unmatchBtn} onClick={() => handleChoice('unmatch')}>👈 Unmatch</button>
            <button style={styles.shortlistBtn} onClick={() => handleChoice('shortlist')}>Shortlist 👉</button>
          </div>
        </div>
      ) : (
        <div style={styles.doneMessage}>
          <h3>No more matches to review.</h3>
          <p>You shortlisted {shortlisted.length} and unmatched {unmatched.length}.</p>
          <button onClick={() => navigate('/')}>🏠 Go Home</button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    padding: '40px',
    background: '#fff0f5',
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  title: {
    fontSize: '2rem',
    color: '#e91e63',
    marginBottom: '20px',
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
    width: '90%',
    maxWidth: '500px',
    textAlign: 'center',
  },
  buttonGroup: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'space-around',
  },
  unmatchBtn: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    backgroundColor: '#ffcdd2',
    color: '#b71c1c',
    cursor: 'pointer',
  },
  shortlistBtn: {
    padding: '10px 20px',
    border: 'none',
    borderRadius: '8px',
    fontWeight: 'bold',
    fontSize: '16px',
    backgroundColor: '#c8e6c9',
    color: '#1b5e20',
    cursor: 'pointer',
  },
  doneMessage: {
    textAlign: 'center',
  },
};

export default MatchCards;
