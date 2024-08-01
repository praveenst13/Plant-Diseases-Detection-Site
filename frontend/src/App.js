import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './components/HomePage';
import ApplePage from './pages/ApplePage';
import GrapesPage from './pages/GrapesPage';
import RicePage from './pages/RicePage';
import PotatoPage from './pages/PotatoPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/plant/apple" element={<ApplePage />} />
      <Route path="/plant/grapes" element={<GrapesPage />} />
      <Route path="/plant/rice" element={<RicePage />} />
      <Route path="/plant/potato" element={<PotatoPage />} />
    </Routes>
  );
}

export default App;


