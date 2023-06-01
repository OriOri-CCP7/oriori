import React from 'react';
import {useRoutes} from 'react-router-dom';
import Testpage from '../src/pages/TestsPage';
import './App.css';

function App() {
  let element = useRoutes([
    {path: '/testpage', element: <Testpage />},
]);
  return element;
  
}

export default App;
