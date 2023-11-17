import React from 'react';
import './App.css';
import UserProfile from './components/UserProfile';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      {/* <UserProfile /> */}
      <Router>
        <Routes>
          {/* Other routes can be defined here */}
          <Route path="/settings" Component={UserProfile} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
