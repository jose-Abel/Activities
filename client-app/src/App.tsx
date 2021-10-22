import React, { useState, useEffect } from 'react';
import './App.css';
import logo from './logo.svg';
import axios from 'axios';

function App() {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/activities')
    .then(response => {
      setActivities(response.data);
    });

  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <ul>
          {activities.map((activity: any) => (
            <li key={activity.id}>{activity.title}
            </li>
          ))}

        </ul>
      </header>
    </div>
  );
}

export default App;
