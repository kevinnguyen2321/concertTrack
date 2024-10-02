import { deleteConcert } from '../../services/concertServices';
import { EditConcert } from './EditConcert';
import './Concert.css';
import '../comments/Comments.css';
import { useEffect, useState } from 'react';
import {
  addNewComment,
  getCommentByConcertIdAndExpandUser,
} from '../../services/commentsServices';
import { Comments } from '../comments/Comments';
import { useNavigate } from 'react-router-dom';

export const Concert = ({
  concert,
  openEditModal,
  isEditModalOpen,
  closeEditModal,
  fetchAndSetAllCurrentUserConcerts,
  currentUser,
}) => {
  const [comments, setComments] = useState([]);
  const [isCommentsModalOpen, setIsCommentsModalOpen] = useState(false);
  const [currentUserComment, setCurrentUserComment] = useState({});

  const navigate = useNavigate();

  // Function to grab comments by concertId and set state//
  const getCommentsAndSetComments = () => {
    getCommentByConcertIdAndExpandUser(concert.id).then((commentsArr) =>
      setComments(commentsArr)
    );
  };
  // On initial render fetch all comments for this concert post//
  useEffect(() => {
    getCommentsAndSetComments();
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

  //Logic for comments//

  const handleOpenCommentsModal = () => {
    setIsCommentsModalOpen(true);
  };

  const handleCloseCommentsModal = () => {
    setIsCommentsModalOpen(false);
  };

  //Function to get today's date in YYYY-MM-DD format//
  const getTodaysDate = () => {
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0]; // Returns in YYYY-MM-DD format
    return formattedDate;
  };

  const handleCommentInput = (e) => {
    const copyObj = { ...currentUserComment };
    copyObj.text = e.target.value;
    setCurrentUserComment(copyObj);
  };

  const handlePostClick = () => {
    const copyCurrentUserCommentObj = { ...currentUserComment };
    copyCurrentUserCommentObj.userId = currentUser.id;
    copyCurrentUserCommentObj.concertId = concert.id;
    copyCurrentUserCommentObj.date = getTodaysDate();

    addNewComment(copyCurrentUserCommentObj).then(() => {
      getCommentsAndSetComments();
      setCurrentUserComment({
        text: '',
        date: '',
        concertId: '',
        userId: '',
      });
    });
  };

  return (
    <div
      className={!isEditModalOpen ? 'show-card' : 'no-hover'}
      onClick={() => {
        navigate(`/my-shows/${concert.id}`);
      }}
    >
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
        <button
          onClick={(event) => {
            event.stopPropagation();
            openEditModal();
          }}
        >
          Edit
        </button>
        <EditConcert
          concertObj={concert}
          isEditModalOpen={isEditModalOpen}
          closeEditModal={closeEditModal}
          fetchAndSetAllCurrentUserConcerts={fetchAndSetAllCurrentUserConcerts}
        />
        <p
          onClick={(event) => {
            event.stopPropagation();
            handleOpenCommentsModal();
          }}
        >
          Comments({comments.length})
        </p>

        <button
          onClick={(event) => {
            event.stopPropagation();
            handleDelete(concert);
          }}
        >
          Delete
        </button>
      </div>

      {isCommentsModalOpen && (
        <div className="comments-modal">
          <div className="comments-modal-content">
            <span
              className="close-modal"
              onClick={(event) => {
                event.stopPropagation();
                handleCloseCommentsModal();
              }}
            >
              &times;
            </span>
            <h2>Comments</h2>
            <div className="comments-list">
              {comments.map((comment) => (
                <Comments
                  comment={comment}
                  key={comment.id}
                  currentUser={currentUser}
                  getCommentsAndSetComments={getCommentsAndSetComments}
                />
              ))}
              <textarea
                placeholder="Add comment"
                value={currentUserComment.text}
                onClick={(event) => {
                  event.stopPropagation();
                }}
                onChange={handleCommentInput}
              ></textarea>
              <button
                className="post-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  handlePostClick();
                }}
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};