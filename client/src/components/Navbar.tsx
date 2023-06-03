import './Navbar.css';
import { useNavigate } from 'react-router-dom';
import { HomeIcon, HeartIcon, FireIcon, MagnifyingGlassIcon } from '@heroicons/react/24/solid';


function Navbar() {
  const navigate = useNavigate();
  return (
    <div className='nav'>
      <ul>
            <li>
              <HomeIcon className='home-icon' 
              onClick={() => navigate('/')}
              />
            </li>
            <li>
              <HeartIcon className='heart-icon' onClick={() => navigate('/favorite')}/>
            </li>
            <li>
              <FireIcon className='popular-icon' onClick={() => navigate('/popular')} />
            </li>
            <li>
              <MagnifyingGlassIcon className='search-icon' onClick={() => navigate('/search')}/>
            </li>
        </ul>
    </div>
  )
}

export default Navbar