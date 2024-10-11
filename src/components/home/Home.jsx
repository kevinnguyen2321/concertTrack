import './Home.css';
import { useState } from 'react';
import { NewConcert } from '../concerts/NewConcert';
import logo from '../../assets/logo.png';

export const Home = ({ currentUser }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <>
      <div className="home-wrapper">
        <h1>Welcome to ConcertTrack</h1>
        <p>Where tracking concerts just became easier</p>
        <button className="button-6" onClick={openModal}>
          Add new concert
        </button>
        <div>
          <img className="big-logo" src={logo} />
        </div>
        <NewConcert
          currentUser={currentUser}
          isModalOpen={isModalOpen}
          onClose={closeModal}
        />
      </div>
      <footer>Join the ConcertTrack community and never miss another concert! 
      © 2024 ConcertTrack. All rights reserved.</footer>
    </>
  );
};
