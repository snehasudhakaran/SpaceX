import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import Navbar from './components/Navbar';
import LoadingSpinner from './utils/loadingSpinner.js'; 

// Lazy loading components
const Rockets = lazy(() => import('./pages/Rockets'));
const RocketDetails = lazy(() => import('./pages/RocketDetails'));
const Home = lazy(() => import('./pages/Home'));
const History = lazy(() => import('./pages/History'));
const Launches = lazy(() => import('./pages/Launches'));

function App() {
  return (
    <div className="App">
      <Navbar />
      {/* Suspense with loading spinner as fallback */}
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/rockets' element={<Rockets />} />
          <Route path="/rockets/:id" element={<RocketDetails />} />
          <Route path='/history' element={<History />} />
          <Route path='/launches' element={<Launches />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
