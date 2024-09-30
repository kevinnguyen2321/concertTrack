import { useEffect, useState } from 'react';
import { getConcertByUserIdAndExpandUser } from '../services/concertServices';
import './MyShows.css';

export const MyShows = ({ currentUser }) => {
  const [currentUserConcerts, setCurrentUserConcerts] = useState([]);

  useEffect(() => {
    getConcertByUserIdAndExpandUser(currentUser.id).then((concertsArr) =>
      setCurrentUserConcerts(concertsArr)
    );
  }, [currentUser]);

  return (
    <div className="my-show-wrapper">
      {currentUserConcerts.map((concert) => {
        return (
          <div key={concert.id} className="show-card">
            <div className="profile-picture-wrapper">
              <h2>{concert.user.fullName}</h2>
              <img src={concert.user.profilePic} />
            </div>
            <div>Artist:{concert.artist}</div>
            <div>Date:{concert.date}</div>
            <div>Rating:{concert.rating}</div>
            <div className="comment-wrapper">
              <button>Edit</button>
              <textarea placeholder="Add comment"></textarea>
              <button>Delete</button>
            </div>
          </div>
        );
      })}
    </div>
  );
};
