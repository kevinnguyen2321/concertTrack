import { useState } from 'react';
import './Community.css';
import { useEffect } from 'react';
import { getAllConcertsAndExpandUser } from '../../services/concertServices';
import { Concert } from '../concerts/Concert';

export const Community = ({ currentUser }) => {
  const [concerts, setConcerts] = useState([]);
  const [isEditModalOpen, setEditModal] = useState(false);
  const [selectedConcert, setSelectedConcert] = useState({});

  const openEditModal = (concert) => {
    setSelectedConcert(concert);
    setEditModal(true);
  };
  const closeEditModal = () => setEditModal(false);

  const fetchAndSetAllConcerts = () => {
    getAllConcertsAndExpandUser().then((allConcertsArr) =>
      setConcerts(allConcertsArr)
    );
  };

  useEffect(() => {
    fetchAndSetAllConcerts();
  }, []);

  return (
    <div className="community-concert-wrapper">
      {concerts.map((concert) => {
        return (
          <Concert
            key={concert.id}
            concert={concert}
            isEditModalOpen={isEditModalOpen}
            openEditModal={() => openEditModal(concert)}
            closeEditModal={closeEditModal}
            currentUser={currentUser}
            selectedConcert={selectedConcert}
            fetchAndSetAllConcerts={fetchAndSetAllConcerts}
          />
        );
      })}
    </div>
  );
};
