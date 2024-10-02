import { deleteConcert } from '../services/concertServices';
import { EditConcert } from './EditConcert';
import './Concert.css';
import './Comments.css';
import { useEffect, useState } from 'react';
import { getCommentByConcertIdAndExpandUser } from '../services/commentsServices';
import { Comments } from './Comments';

export const Concert = ({
  concert,
  openEditModal,
  isEditModalOpen,
  closeEditModal,
  fetchAndSetAllCurrentUserConcerts,
}) => {
  const [comments, setComments] = useState([]);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);

  useEffect(() => {
    getCommentByConcertIdAndExpandUser(concert.id).then((commentsArr) =>
      setComments(commentsArr)
    );
  }, []);

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

  const handleOpenCommentsModal = () => {
    setIsCommentsModalOpen(true);
  };

  const handleCloseCommentsModal = () => {
    setIsCommentsModalOpen(false);
  };

  return (
    <div className="show-card">
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
          fetchAndSetAllCurrentUserConcerts={fetchAndSetAllCurrentUserConcerts}
        />
        <p onClick={handleOpenCommentsModal}>Comments({comments.length})</p>

        <button
          onClick={() => {
            handleDelete(concert);
          }}
        >
          Delete
        </button>
      </div>

      {isCommentsModalOpen && (
        <div className="comments-modal">
          <div className="modal-content">
            <span className="close-modal" onClick={handleCloseCommentsModal}>
              &times;
            </span>
            <h2>Comments</h2>
            <div className="comments-list">
              {comments.map((comment) => (
                <Comments comment={comment} key={comment.id} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
