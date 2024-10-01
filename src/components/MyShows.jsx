import { useEffect, useState } from 'react';
import {
  deleteConcert,
  getConcertByUserIdAndExpandUser,
} from '../services/concertServices';
import './MyShows.css';
import { NewConcert } from './NewConcert';
import { EditConcert } from './EditConcert';
import {
  getAllComments,
  getCommentByConcertIdAndExpandUser,
} from '../services/commentsServices';

export const MyShows = ({ currentUser }) => {
  const [currentUserConcerts, setCurrentUserConcerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setEditModal] = useState(false);
  const [comments, setComments] = useState([]);
  //Functions to set state for new concert modal//
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  //Functions to set state for edit modal//
  const openEditModal = () => setEditModal(true);
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
    getAllComments().then((commentsArr) => setComments(commentsArr));
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

  const filterCommentsByConcertId = (concertId) => {
    const filteredComments = comments.filter(
      (comment) => comment.concertId === concertId
    );
    console.log(filteredComments);
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
                <button onClick={openEditModal}>Edit</button>
                <EditConcert
                  concertObj={concert}
                  isEditModalOpen={isEditModalOpen}
                  closeEditModal={closeEditModal}
                  fetchAndSetAllCurrentUserConcerts={
                    fetchAndSetAllCurrentUserConcerts
                  }
                />

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
