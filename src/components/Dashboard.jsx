import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = ({ user, onLogout }) => {
  const [userData, setUserData] = useState(user);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Fetch updated user data on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        setLoading(true);
        const response = await axios.get('http://localhost:3001/api/user/profile', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setUserData(response.data.user);
      } catch (err) {
        console.error('Error fetching user data:', err);
        if (err.response?.status === 401) {
          // Token expired or invalid
          onLogout();
        }
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [onLogout]);

  const handleLogout = () => {
    onLogout();
  };

  if (loading) {
    return (
      <div className="dashboard">
        <div className="container">
          <div className="dashboard-header">
            <h2 className="dashboard-title">Loading...</h2>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard-header">
          <h1 className="dashboard-title">Welcome, {userData?.name || 'User'}!</h1>
          <p className="dashboard-subtitle">
            You are successfully logged in to your account.
          </p>
          <button onClick={handleLogout} className="logout-btn">
            Logout
          </button>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="user-info">
          <h2>Your Profile Information</h2>
          <div className="info-grid">
            <div className="info-item">
              <strong>Name:</strong> {userData?.name || 'N/A'}
            </div>
            <div className="info-item">
              <strong>Email:</strong> {userData?.email || 'N/A'}
            </div>
            <div className="info-item">
              <strong>Account Created:</strong> {userData?.createdAt ? new Date(userData.createdAt).toLocaleDateString() : 'N/A'}
            </div>
          </div>
        </div>

        <div className="dashboard-content">
          <h2>Dashboard Features</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Profile Management</h3>
              <p>Update your personal information and preferences.</p>
            </div>
            <div className="feature-card">
              <h3>Security Settings</h3>
              <p>Manage your password and account security.</p>
            </div>
            <div className="feature-card">
              <h3>Activity History</h3>
              <p>View your recent account activity and login history.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 