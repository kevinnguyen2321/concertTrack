import { useState } from 'react';
import './NewConcert.css';
import { useEffect } from 'react';
import { getAllGenres } from '../../services/genreServices';
import { addNewConcert } from '../../services/concertServices';
import { useLocation, useNavigate } from 'react-router-dom';

export const NewConcert = ({
  currentUser,
  isModalOpen,
  onClose,
  fetchAndSetAllCurrentUserConcerts,
}) => {
  const [genres, setGenres] = useState([]);
  const [concertObj, setConcertObj] = useState({});
  const [rating, setRating] = useState(0);
  const navigate = useNavigate();
  const location = useLocation();
  //Fetch all genres data on initial render//
  useEffect(() => {
    getAllGenres().then((genresArr) => setGenres(genresArr));
  }, []);
  // Function for onChange event for inputs and select element//
  const handleInputChange = (event) => {
    const copyObj = { ...concertObj };
    if (event.target.name === 'date') {
      // Create a new Date object in UTC
      const utcDate = new Date(event.target.value + 'T00:00:00Z'); // 'T00:00:00Z' ensures it is interpreted as UTC
      copyObj[event.target.name] = utcDate.toISOString().split('T')[0]; // Store in YYYY-MM-DD format
      console.log('Stored UTC Date:', copyObj[event.target.name]);
    } else if (event.target.name === 'genreId') {
      copyObj[event.target.name] = parseInt(event.target.value);
    } else {
      copyObj[event.target.name] = event.target.value;
    }

    setConcertObj(copyObj);
  };

  //Function to handle rating click//
  const handleRatingClick = (value) => {
    setRating(value);
    const copyOfConcertObj = { ...concertObj, rating: value };
    setConcertObj(copyOfConcertObj);
  };

  //Function for adding new concert post to database//
  const handleAddNewConcertClick = (e) => {
    e.preventDefault();

    // Select the form element
    const form = e.target.closest('form');

    // Trigger HTML5 form validation
    if (!form.checkValidity()) {
      // If form is invalid, show the validation errors and prevent further actions
      form.reportValidity(); // This will show the default validation messages
      return;
    }

    //If the form is valid then send the data to the database//

    const copyOfConcertObjWithUserId = {
      ...concertObj,
      userId: currentUser.id,
    };

    if (copyOfConcertObjWithUserId.rating) {
      addNewConcert(copyOfConcertObjWithUserId)
        .then(() => {
          setConcertObj({
            artist: '',
            date: '',
            genreId: '',
            venue: '',
            rating: null,
          });
          if (location.pathname !== '/my-shows') {
            navigate('/my-shows');
          } else {
            onClose();
            fetchAndSetAllCurrentUserConcerts();
          }
        })
        .catch((error) => {
          console.error('Error adding new concert:', error);
          alert('Failed to add new concert. Please try again');
        });
    } else {
      alert('Please rate this concert');
    }
  };

  if (!isModalOpen) {
    return null; //If modal is not open then DO NOT RENDER CONTENT//
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          X
        </button>
        <form className="form-wrapper">
          <div className="new-concert-header-wrapper">
            <h2>New Concert</h2>
          </div>

          <div className="field-set">
            <label htmlFor="artist">Artist</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={concertObj.artist ? concertObj.artist : ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field-set">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={concertObj.date ? concertObj.date : ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field-set">
            <label htmlFor="genre-select">Genre</label>
            <select
              name="genreId"
              id="genre-select"
              onChange={handleInputChange}
              value={concertObj.genreId ? concertObj.genreId : ''}
              required
            >
              <option value="">--Please choose a genre--</option>
              {genres.map((genre) => {
                return (
                  <option value={genre.id} key={genre.id}>
                    {genre.name}
                  </option>
                );
              })}
            </select>
          </div>
          <div className="field-set">
            <label htmlFor="venue">Venue</label>
            <input
              className="venue-input"
              type="text"
              id="venue"
              name="venue"
              value={concertObj.venue ? concertObj.venue : ''}
              onChange={handleInputChange}
              required
            />
          </div>

          <div className="field-set ratings">
            <label>Rating</label>
            <div className="stars">
              {[1, 2, 3, 4, 5].map((starValue) => (
                <span
                  key={starValue}
                  className={`star ${starValue <= rating ? 'filled' : ''}`}
                  onClick={() => handleRatingClick(starValue)}
                >
                  ★
                </span>
              ))}
            </div>
          </div>

          <div className="add-concert-btn-wrapper">
            <button
              className="button-6 add-btn"
              onClick={handleAddNewConcertClick}
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
