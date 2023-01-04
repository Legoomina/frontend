import logo from './logo.svg';
import './App.css';

import React, { useState, useEffect } from 'react';

function App() {

  const [data, setData] = useState("");

  useEffect(() => {
    fetch("http://localhost:3001/")
      .then(res => res.json())
      .then(res => {setData(res.message)});
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Fetched: {data}
        </a>
      </header>
    </div>
  );
}

export default App;
