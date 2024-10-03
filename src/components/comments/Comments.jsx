import { deleteComment } from '../../services/commentsServices';
import './Comments.css';

export const Comments = ({
  comment,
  currentUser,
  getCommentsAndSetComments,
}) => {
  const handleDeleteComment = () => {
    deleteComment(comment.id).then(() => {
      getCommentsAndSetComments();
    });
  };
  return (
    <div className="textarea-wrapper">
      <div className="comment-container">
        <img
          className="comment-pic"
          src={`${comment.user.profilePic}`}
          alt="Profile picture"
        />
        <div className="author-info-wrapper">
          <p className="author-name">{comment.user.fullName}</p>
          <p>{comment.text}</p>
          {comment.userId === currentUser.id && (
            <button
              onClick={(event) => {
                event.stopPropagation();
                handleDeleteComment();
              }}
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
