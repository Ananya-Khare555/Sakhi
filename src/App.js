import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Welcome from './pages/welcome';
import MicroSurvey from './pages/microsurvey';
import VoiceSurvey from './pages/voicesurvey';
import Matches from './pages/matches';
import FinalChoice from './pages/finalchoice';
import SignIn from './pages/signin';
import SignUp from './pages/signup';
import MatchCards from './pages/MatchCards';
import PrivateRoute from './components/PrivateRoute';
import AuthPage from './pages/auth';

import './index.css';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Welcome />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/matches" element={<MatchCards />} />

        {/* Protected Routes */}
        <Route
          path="/auth"
          element={
            <PrivateRoute>
              <AuthPage />
            </PrivateRoute>
          }
          />
        <Route
          path="/microsurvey"
          element={
            <PrivateRoute>
              <MicroSurvey />
            </PrivateRoute>
          }
        />
        
        <Route
          path="/voicesurvey"
          element={
            <PrivateRoute>
              <VoiceSurvey />
            </PrivateRoute>
          }
        />
        <Route path="/matches" element={<MatchCards />} />
        <Route
          path="/matches"
          element={
            <PrivateRoute>
              <Matches />
            </PrivateRoute>
          }
        />
        <Route
          path="/finalchoice"
          element={
            <PrivateRoute>
              <FinalChoice />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
