import React from 'react';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { AudioProvider } from './contexts/AudioContext';
import MainPage from './pages/MainPage';
import WorksPage from './pages/WorksPage';

const App: React.FC = () => {
  const location = useLocation();

  return (
    <AudioProvider>
      <AnimatePresence mode="wait">
        <Routes location={location}>
          <Route path="/" element={<MainPage />} />
          <Route path="/works" element={<WorksPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </AudioProvider>
  );
};

export default App;