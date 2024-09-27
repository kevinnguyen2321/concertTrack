import { Link } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
  return (
    <div className="nav-bar-wrapper">
      <h1>ConcertTrack</h1>
      <ul className="links-wrapper">
        <li>
          <Link to={'/'}>Home</Link>
        </li>

        <li>
          <Link to={'/myshows'}>MyShows</Link>
        </li>

        <li>
          <Link to={'/community'}>Community</Link>
        </li>

        <li>
          <Link to={'/logout'}>Logout</Link>
        </li>
      </ul>
    </div>
  );
};
