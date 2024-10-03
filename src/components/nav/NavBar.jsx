import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';

export const NavBar = () => {
  const navigate = useNavigate();
  return (
    <div className="nav-bar-wrapper">
      <h1>
        <Link to={'/'}>ConcertTrack</Link>
      </h1>
      <ul className="links-wrapper">
        <li>
          <Link to={'/'}>Home</Link>
        </li>

        <li>
          <Link to={'/my-shows'}>My Shows</Link>
        </li>

        <li>
          <Link to={'/community'}>Community</Link>
        </li>

        {localStorage.getItem('concert_user') ? (
          <li>
            <Link
              className="navbar-link"
              to=""
              onClick={() => {
                localStorage.removeItem('concert_user');
                navigate('/', { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ''
        )}
      </ul>
    </div>
  );
};
