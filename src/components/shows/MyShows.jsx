import { useEffect, useState } from 'react';
import { getConcertByUserIdAndExpandUser } from '../../services/concertServices';
import './MyShows.css';
import { NewConcert } from '../concerts/NewConcert';
import { Concert } from '../concerts/Concert';

export const MyShows = ({ currentUser }) => {
  const [currentUserConcerts, setCurrentUserConcerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModal] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState({});

  //Functions to set state for new concert modal//
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  //Functions to set state for edit modal//
  const openEditModal = (concert) => {
    setSelectedConcert(concert);
    setEditModal(true);
  };
  const closeEditModal = () => setEditModal(false);
  //Function to fetch all concert posts for current user//
  const fetchAndSetAllCurrentUserConcerts = () => {
    getConcertByUserIdAndExpandUser(currentUser.id).then((concertsArr) =>
      setCurrentUserConcerts(concertsArr)
    );
  };
  //Fetch all concert posts for current user on initial render//
  useEffect(() => {
    fetchAndSetAllCurrentUserConcerts();
  }, [currentUser]);

  return (
    <div className="my-show-wrapper">
      <div className="button-wrapper">
        <button onClick={openModal}>+</button>
      </div>
      <div className="card-wrapper">
        {currentUserConcerts.map((concert) => {
          return (
            <Concert
              concert={concert}
              key={concert.id}
              openEditModal={() => openEditModal(concert)}
              isEditModalOpen={isEditModalOpen}
              closeEditModal={closeEditModal}
              fetchAndSetAllCurrentUserConcerts={
                fetchAndSetAllCurrentUserConcerts
              }
              currentUser={currentUser}
              selectedConcert={selectedConcert}
            />
          );
        })}
      </div>
      {/* NewConcert modal will display if isModalOpen is set to true */}
      <NewConcert
        currentUser={currentUser}
        isModalOpen={isModalOpen}
        onClose={closeModal}
        fetchAndSetAllCurrentUserConcerts={fetchAndSetAllCurrentUserConcerts}
      />
    </div>
  );
};
