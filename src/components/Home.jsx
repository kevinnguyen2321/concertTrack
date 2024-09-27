import { useNavigate } from 'react-router-dom';
import './Home.css';

export const Home = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/new-concert');
  };
  return (
    <div className="home-wrapper">
      <h1>Welcome to ConcertTrack</h1>
      <p>Where tracking concerts just became easier</p>
      <button className="new-concert-btn" onClick={handleClick}>
        Add new concert
      </button>
    </div>
  );
};
