import { useState } from 'react';
import './NewConcert.css';
import { useEffect } from 'react';
import { getAllGenres } from '../services/genreServices';

export const NewConcert = () => {
  const [genres, setGenres] = useState([]);
  const [concertObj, setConcertObj] = useState({});

  useEffect(() => {
    getAllGenres().then((genresArr) => setGenres(genresArr));
  }, []);

  const handleInputChange = (event) => {};

  const handleAddNewConcertClick = () => {
    console.log('helooos');
  };

  return (
    <form className="form-wrapper">
      <div>
        <h2>New Concert</h2>
      </div>

      <div className="field-set">
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          id="artist"
          name="artist"
          value={concertObj.artist}
          required
        />
      </div>
      <div className="field-set">
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" required />
      </div>
      <div className="field-set">
        <label htmlFor="genre-select">Genre</label>
        <select name="genreId" id="genre-select" required>
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
        <input type="text" id="venue" name="venue" />
      </div>
      <div className="field-set">
        <label htmlFor="rating">Rating</label>
        <input type="radio" id="one" name="rating" value={1} required />
        <input type="radio" id="two" name="rating" value={2} />
        <input type="radio" id="three" name="rating" value={3} />
        <input type="radio" id="four" name="rating" value={4} />
        <input type="radio" id="five" name="rating" value={5} />
      </div>
      <div className="add-concert-btn-wrapper">
        <button onClick={handleAddNewConcertClick}>Add</button>
      </div>
    </form>
  );
};
