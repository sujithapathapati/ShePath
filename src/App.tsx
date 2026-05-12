// src/App.tsx
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from 'react-router-dom';

import { LanguageProvider } from './contexts/LanguageContext';
import { UserProvider } from './contexts/UserContext';
import { EmployerProvider, useEmployer } from './contexts/EmployerContext';
import { VoiceAssistantProvider } from './contexts/VoiceAssistantContext';

import Navbar from './components/Navbar';
import Footer from './components/Footer';

import Homepage from './pages/Homepage';
import Login from './pages/Login';
import Register from './pages/Register';
import Jobs from './pages/Jobs';
import Skills from './pages/Skills';
import Exhibition from './pages/Exhibition';
import Support from './pages/Support';
import Profile from './pages/Profile';

import VoiceAssistant from './components/VoiceAssistant';
import EmployerAuth from './components/Employer/EmployerAuth';

import EmployerLayout from './pages/employer/EmployerLayout';
import EmployerDashboard from './pages/employer/EmployerDashboard';
import PostJob from './pages/employer/JobPostingForm';
import EmployerLogin from './pages/employer/EmployerLogin';
import Applications from './pages/employer/Applications';

function AppContent() {
  const { state } = useEmployer();
  const [showEmployerAuth, setShowEmployerAuth] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (showEmployerAuth && location.pathname !== '/employer-auth') {
      navigate('/employer-auth', { replace: true });
    } else if (!showEmployerAuth && location.pathname === '/employer-auth') {
      navigate(-1);
    }
  }, [showEmployerAuth, navigate, location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-secondary-50 to-primary-50">
      <Navbar onEmployerLogin={() => setShowEmployerAuth(true)} />

      <main className="pt-16">
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/jobs" element={<Jobs />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/exhibition" element={<Exhibition />} />
          <Route path="/support" element={<Support />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/employer/login" element={<EmployerLogin />} />

          {/* Modal Auth */}
          <Route
            path="/employer-auth"
            element={
              <EmployerAuth
                isOpen={showEmployerAuth}
                onClose={() => setShowEmployerAuth(false)}
              />
            }
          />

          {/* Employer Protected Routes */}
          <Route path="/employer" element={<EmployerLayout />}>
            <Route
              path="dashboard"
              element={
                state.isEmployerAuthenticated ? (
                  <EmployerDashboard />
                ) : (
                  <Navigate to="/employer/login" />
                )
              }
            />
            <Route
              path="post-job"
              element={
                state.isEmployerAuthenticated ? (
                  <PostJob />
                ) : (
                  <Navigate to="/employer/login" />
                )
              }
            />
            <Route
              path="applications"
              element={
                state.isEmployerAuthenticated ? (
                  <Applications />
                ) : (
                  <Navigate to="/employer/login" />
                )
              }
            />
          </Route>
        </Routes>
      </main>

      <Footer />
      <VoiceAssistant />
    </div>
  );
}

function App() {
  return (
    <LanguageProvider>
      <UserProvider>
        <EmployerProvider>
          <VoiceAssistantProvider>
            <Router>
              <AppContent />
            </Router>
          </VoiceAssistantProvider>
        </EmployerProvider>
      </UserProvider>
    </LanguageProvider>
  );
}

export default App;
