import logo from './logo.svg';
import './App.css';
import LoginSignup from './Components/LoginSignup/LoginSignup';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginSignup />} />
          <Route path="/dashboard" element={<div>Dashboard Page</div>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
