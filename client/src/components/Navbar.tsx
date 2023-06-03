import './Navbar.css';
import { useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  return (
    <div className='nav'>
      <ul>
            <li>
              <button onClick={() => navigate('/')} className="menu-title">Home</button>
            </li>
            <li>
              <button onClick={() => navigate('/favorite')} className="menu-title">Favorite</button>
            </li>
            <li>
              <button onClick={() => navigate('/popular')} className="menu-title">Popular</button>
            </li>
            <li>
              <button onClick={() => navigate('/search')} className="menu-title">Search</button>
            </li>
        </ul>
    </div>
  )
}

export default Navbar