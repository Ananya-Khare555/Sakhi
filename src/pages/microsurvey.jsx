import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const questions = [
  { question: 'How clean do you like to keep your space?', options: ['Very Clean', 'Moderately Clean', 'Not Too Clean'] },
  { question: 'What is your typical sleep schedule?', options: ['Early Sleeper', 'Night Owl', 'Flexible'] },
  { question: 'How social are you?', options: ['Very Social', 'Somewhat Social', 'Not Social'] },
  { question: 'What are your usual working hours?', options: ['9 to 5', 'Evenings', 'Flexible'] },
  { question: 'How much noise can you tolerate?', options: ['Very Tolerant', 'Moderately Tolerant', 'Not Tolerant'] },
];

const MicroSurvey = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [responses, setResponses] = useState([]);
  const navigate = useNavigate();

  const handleOptionClick = async (option) => {
    const updatedResponses = [...responses, option];
    setResponses(updatedResponses);

    if (currentQuestion === questions.length - 1) {
      try {
        const docRef = await addDoc(collection(db, 'surveys'), {
          microsurvey: updatedResponses,
          timestamp: Timestamp.now()
        });
        console.log('Survey saved with ID:', docRef.id);
        navigate('/voicesurvey', { state: { surveyId: docRef.id } });
      } catch (e) {
        console.error('Error saving survey:', e);
      }
    } else {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #f9eafc, #fde2e4)',
      padding: '20px',
    },
    box: {
      backgroundColor: '#fff',
      padding: '30px',
      borderRadius: '12px',
      maxWidth: '500px',
      width: '100%',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      textAlign: 'center',
    },
    question: {
      fontSize: '1.4rem',
      marginBottom: '20px',
      color: '#ec4899',
    },
    option: {
      backgroundColor: '#fce7f3',
      color: '#7a0449',
      border: '1px solid #ec4899',
      padding: '12px',
      borderRadius: '8px',
      marginBottom: '10px',
      cursor: 'pointer',
      width: '100%',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h2 style={styles.question}>{questions[currentQuestion].question}</h2>
        {questions[currentQuestion].options.map((option, idx) => (
          <div
            key={idx}
            style={styles.option}
            onClick={() => handleOptionClick(option)}
          >
            {option}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MicroSurvey;
