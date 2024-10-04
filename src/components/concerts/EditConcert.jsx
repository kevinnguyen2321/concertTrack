import { useEffect, useState } from 'react';
import './NewConcert.css';
import { getAllGenres } from '../../services/genreServices';
import { updateConcert } from '../../services/concertServices';

export const EditConcert = ({
  concertObj,
  isEditModalOpen,
  closeEditModal,
  fetchAndSetAllCurrentUserConcerts,
  selectedConcert,
  fetchAndSetAllConcerts,
}) => {
  //State//
  const [genres, setGenres] = useState([]);
  const [editedConcertObj, setEditedConcertObj] = useState(
    selectedConcert || {}
  );
  //Grab all genres//
  useEffect(() => {
    getAllGenres().then((genresArr) => setGenres(genresArr));
  }, []);
  // Update editedConcertObj whenever concertObj changes
  useEffect(() => {
    if (selectedConcert) {
      setEditedConcertObj(selectedConcert);
    }
  }, [selectedConcert]);
  // if EditModalOpen state is false then do not render content//
  if (!isEditModalOpen) {
    return null;
  }

  const handleInputChange = (e) => {
    const copyObj = { ...editedConcertObj };

    if (e.target.name === 'genreId') {
      copyObj[e.target.name] = parseInt(e.target.value);
    } else if (e.target.name === 'rating') {
      copyObj[e.target.name] = parseInt(e.target.value);
    } else {
      copyObj[e.target.name] = e.target.value;
    }
    setEditedConcertObj(copyObj);
  };

  const handleSave = (e) => {
    e.preventDefault();
    // Select the form element
    const form = e.target.closest('form');

    // Trigger HTML5 form validation
    if (!form.checkValidity()) {
      // If form is invalid, show the validation errors and prevent further actions
      form.reportValidity(); // This will show the default validation messages
      return;
    }

    delete editedConcertObj.user;

    updateConcert(editedConcertObj).then(() => {
      closeEditModal();
      // Check which prop is truthy then call the one that is passed//
      if (fetchAndSetAllCurrentUserConcerts) {
        fetchAndSetAllCurrentUserConcerts();
      } else if (fetchAndSetAllConcerts) {
        fetchAndSetAllConcerts();
      }
    });
  };

  return (
    <div
      className="modal-overlay"
      onClick={(event) => {
        event.stopPropagation();
        closeEditModal();
      }}
    >
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={closeEditModal}>
          X
        </button>
        <form className="form-wrapper">
          <div>
            <h2>Edit Concert</h2>
          </div>

          <div className="field-set">
            <label htmlFor="artist">Artist</label>
            <input
              type="text"
              id="artist"
              name="artist"
              value={editedConcertObj.artist || ''}
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
              value={editedConcertObj.date || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field-set">
            <label htmlFor="genre-select">Genre</label>
            <select
              name="genreId"
              id="genre-select"
              value={editedConcertObj.genreId || ''}
              onChange={handleInputChange}
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
              type="text"
              id="venue"
              name="venue"
              value={editedConcertObj.venue || ''}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="field-set">
            <label htmlFor="rating">Rating</label>
            <input
              type="radio"
              id="one"
              name="rating"
              value={1}
              checked={editedConcertObj.rating === 1}
              onChange={handleInputChange}
              required
            />
            <input
              type="radio"
              id="two"
              name="rating"
              value={2}
              checked={editedConcertObj.rating === 2}
              onChange={handleInputChange}
            />
            <input
              type="radio"
              id="three"
              name="rating"
              value={3}
              checked={editedConcertObj.rating === 3}
              onChange={handleInputChange}
            />
            <input
              type="radio"
              id="four"
              name="rating"
              value={4}
              checked={editedConcertObj.rating === 4}
              onChange={handleInputChange}
            />
            <input
              type="radio"
              id="five"
              name="rating"
              value={5}
              checked={editedConcertObj.rating === 5}
              onChange={handleInputChange}
            />
          </div>
          <div className="add-concert-btn-wrapper">
            <button onClick={handleSave}>Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};
