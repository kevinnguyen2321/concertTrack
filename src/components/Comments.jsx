import './Comments.css';

export const Comments = ({ comment }) => {
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
        </div>
      </div>
      <textarea placeholder="Add comment"></textarea>
      <button className="post-btn">Post</button>
    </div>
  );
};
