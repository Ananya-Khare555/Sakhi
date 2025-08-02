import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { db } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';

const VoiceSurvey = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const surveyId = location.state?.surveyId;

  useEffect(() => {
    const script = document.createElement('script');
    script.id = 'omnidimension-web-widget';
    script.src = 'https://backend.omnidim.io/web_widget.js?secret_key=a4deb5f8b67a21042663a75189002139';
    script.async = true;
    document.body.appendChild(script);

    const style = document.createElement('style');
    style.innerHTML = `
      #omnidim-chat-widget {
        position: fixed !important;
        bottom: 20px !important;
        right: 20px !important;
        z-index: 9999 !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.getElementById('omnidimension-web-widget')?.remove();
      style.remove();
    };
  }, []);

  const handleFinishSurvey = async () => {
    if (!surveyId) {
      console.error('No surveyId passed to VoiceSurvey');
      return;
    }

    try {
      await updateDoc(doc(db, 'surveys', surveyId), {
        voicesurvey: {
          voiceResponse1: 'I prefer someone quiet',
          voiceResponse2: 'I am a night owl',
          timestamp: new Date()
        }
      });
      console.log('Voice survey responses saved.');
      navigate('/matches', { state: { surveyId } });
    } catch (error) {
      console.error('Error updating voice survey:', error);
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(to bottom right, #fde2e4, #fff1e6)',
      padding: '20px',
    },
    box: {
      maxWidth: '600px',
      width: '100%',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
      padding: '30px',
      textAlign: 'center',
    },
    heading: {
      fontSize: '2rem',
      marginBottom: '10px',
      color: '#ec4899',
    },
    subtext: {
      fontSize: '1rem',
      color: '#555',
      marginBottom: '20px',
    },
    note: {
      fontSize: '0.85rem',
      color: '#999',
    },
    button: {
      marginTop: '30px',
      padding: '12px 20px',
      fontSize: '1rem',
      backgroundColor: '#ec4899',
      color: '#fff',
      border: 'none',
      borderRadius: '8px',
      cursor: 'pointer',
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.box}>
        <h1 style={styles.heading}>🎙️ Voice Survey Assistant</h1>
        <p style={styles.subtext}>Your voice assistant will ask you some follow-up questions.</p>
        <p style={styles.note}>Speak clearly when prompted. The assistant will guide you.</p>

        <button style={styles.button} onClick={handleFinishSurvey}>
          Finish Voice Survey
        </button>
      </div>
    </div>
  );
};

export default VoiceSurvey;
