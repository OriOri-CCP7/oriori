import './App.css';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Favorite from './pages/Favorites';
import Popular from './pages/Popular';
import Search from './pages/Search';
import Signup from './pages/Signup';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { AuthContextProvider } from './context/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthContextProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/favorite' element={<Favorite/>}></Route>
        <Route path='/popular' element={<Popular/>}></Route>
        <Route path='/search' element={<Search/>}></Route>
      </Routes>
      <Navbar/>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  );
}

export default App;
