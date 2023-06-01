import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Testpage from '../src/pages/TestsPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/testpage" element={<Testpage></Testpage>}></Route>
      </Routes>
    </div>
  );
}

export default App;
