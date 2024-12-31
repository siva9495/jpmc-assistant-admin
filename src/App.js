import React from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AdminSigninPage from './AdminSign/AdminSigninPage';
import AdminDashboardPage from './AdminDashboard/AdminDashboardPage';

function App() {
  return (
    <div className="App">
      <Toaster position="top-center" reverseOrder={false} />
      <Router>
        <Routes>
          <Route path="/" element={<AdminSigninPage />} />
          <Route path="/AdminDashboardPage" element={<AdminDashboardPage />} />
          <Route
            path="*"
            element={<div style={{ padding: '2rem' }}>404: Page Not Found</div>}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
