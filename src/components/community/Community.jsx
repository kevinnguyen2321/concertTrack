import { useState } from 'react';
import './Community.css';
import { useEffect } from 'react';
import { getAllConcertsAndExpandUser } from '../../services/concertServices';
import { Concert } from '../concerts/Concert';

export const Community = () => {
  const [concerts, setConcerts] = useState([]);
  const [isEditModalOpen, setEditModal] = useState(false);

  const openEditModal = () => setEditModal(true);
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
            openEditModal={openEditModal}
            closeEditModal={closeEditModal}
          />
        );
      })}
    </div>
  );
};
