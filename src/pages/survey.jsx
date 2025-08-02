import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Survey() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    cleanliness: '',
    sleep: '',
    work: '',
    social: '',
    roomPreference: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    localStorage.setItem('surveyData', JSON.stringify(form));
    navigate('/voice');
  };

  return (
    <div>
      <h2>Quick Micro Survey</h2>
      <label>Cleanliness Level:</label>
      <input name="cleanliness" onChange={handleChange} /><br />
      <label>Sleep Schedule:</label>
      <input name="sleep" onChange={handleChange} /><br />
      <label>Work Hours:</label>
      <input name="work" onChange={handleChange} /><br />
      <label>Social Behavior:</label>
      <input name="social" onChange={handleChange} /><br />
      <label>Room Preference:</label>
      <input name="roomPreference" onChange={handleChange} /><br />

      <button onClick={handleSubmit}>Continue to Voice Survey</button>
    </div>
  );
}