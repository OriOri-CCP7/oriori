
import Testpage from '../src/pages/TestsPage';
import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorite from './pages/Favorites';
import Popular from './pages/Popular';
import Search from './pages/Search';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Onboarding from './pages/Onboarding';

function App() {
  
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/favorite' element={<Favorite/>}></Route>
        <Route path='/popular' element={<Popular/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
        <Route path='/testpage' element={<Testpage />}></Route>
        <Route path='/onboarding' element={<Onboarding/>}></Route>
      </Routes>
      <Navbar/>
      </BrowserRouter>
    </div>
  );
}

export default App;
