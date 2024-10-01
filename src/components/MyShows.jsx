import { useEffect, useState } from 'react';
import {
  deleteConcert,
  getConcertByUserIdAndExpandUser,
} from '../services/concertServices';
import './MyShows.css';
import { NewConcert } from './NewConcert';

export const MyShows = ({ currentUser }) => {
  const [currentUserConcerts, setCurrentUserConcerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  //Functions to set state for new concert modal//
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
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
  //Function to format date to MM/DD/YYY format//
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);

    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const day = dateObj.getDate().toString().padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const handleDelete = (concertObj) => {
    deleteConcert(concertObj.id).then(() => {
      fetchAndSetAllCurrentUserConcerts();
    });
  };

  return (
    <div className="my-show-wrapper">
      <div className="button-wrapper">
        <button onClick={openModal}>+</button>
      </div>
      <div className="card-wrapper">
        {currentUserConcerts.map((concert) => {
          return (
            <div key={concert.id} className="show-card">
              <div className="profile-picture-wrapper">
                <h2>{concert.user.fullName}</h2>
                <img src={concert.user.profilePic} />
              </div>
              <div>Artist:{concert.artist}</div>
              <div>
                Date:
                {formatDate(concert.date)}
              </div>
              <div>Rating:{concert.rating}</div>
              <div className="comment-wrapper">
                <button>Edit</button>
                <div className="textarea-wrapper">
                  <textarea placeholder="Add comment"></textarea>
                  <button className="post-btn">Post</button>
                </div>
                <button
                  onClick={() => {
                    handleDelete(concert);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <NewConcert
        currentUser={currentUser}
        isModalOpen={isModalOpen}
        onClose={closeModal}
        fetchAndSetAllCurrentUserConcerts={fetchAndSetAllCurrentUserConcerts}
      />
    </div>
  );
};
