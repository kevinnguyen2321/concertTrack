import './Home.css';
import { useState } from 'react';
import { NewConcert } from '../concerts/NewConcert';
import { Link } from 'react-router-dom';

export const Home = ({ currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="home-wrapper">
      <h1>Welcome to ConcertTrack</h1>
      <p>Where tracking concerts just became easier</p>
      <button className="new-concert-btn" onClick={openModal}>
        Add new concert
      </button>
      <NewConcert
        currentUser={currentUser}
        isModalOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};
