import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const FinalChoice = ({ shortlisted }) => {
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  const handleSelect = (person) => {
    setSelected(person);
    setTimeout(() => {
      alert(`🎉 Roommate Found: ${person.name}`);
      navigate('/'); // Or redirect to home or summary page
    }, 1000);
  };

  const styles = {
    container: {
      minHeight: '100vh',
      padding: '20px',
      background: '#fdf2f8',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    heading: {
      fontSize: '2rem',
      color: '#ec4899',
      marginBottom: '20px',
    },
    grid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
      gap: '20px',
      width: '100%',
      maxWidth: '800px',
    },
    card: {
      backgroundColor: '#fff',
      borderRadius: '12px',
      boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
      padding: '15px',
      textAlign: 'center',
      cursor: 'pointer',
      transition: 'transform 0.2s',
    },
    selectedCard: {
      border: '3px solid #10b981',
      transform: 'scale(1.05)',
    },
    img: {
      width: '100px',
      height: '100px',
      borderRadius: '50%',
      objectFit: 'cover',
      marginBottom: '10px',
    },
    name: {
      fontSize: '18px',
      fontWeight: 'bold',
      color: '#ec4899',
    },
    traits: {
      fontSize: '14px',
      color: '#555',
      marginTop: '8px',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>🎯 Choose Your Roommate</h1>
      <div style={styles.grid}>
        {shortlisted.map((person, index) => (
          <div
            key={index}
            style={{
              ...styles.card,
              ...(selected?.name === person.name ? styles.selectedCard : {}),
            }}
            onClick={() => handleSelect(person)}
          >
            <img src={person.image} alt={person.name} style={styles.img} />
            <div style={styles.name}>{person.name}</div>
            <div style={styles.traits}>{person.traits.join(', ')}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FinalChoice;
