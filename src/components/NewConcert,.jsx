import './NewConcert.css';

export const NewConcert = () => {
  return (
    <form className="form-wrapper">
      <div>
        <h2>New Concert</h2>
      </div>

      <div className="field-set">
        <label htmlFor="artist">Artist</label>
        <input type="text" id="artist" name="artist" required />
      </div>
      <div className="field-set">
        <label htmlFor="date">Date</label>
        <input type="date" name="date" id="date" required />
      </div>
      <div className="field-set">
        <label htmlFor="genre-select">Genre</label>
        <select name="genre" id="genre-select">
          <option value="">--Please choose a genre--</option>
        </select>
      </div>
      <div className="field-set">
        <label htmlFor="venue">Venue</label>
        <input type="text" id="venue" name="venue" />
      </div>
      <div className="field-set">
        <label htmlFor="rating">Rating</label>
        <input type="radio" id="rating" name="rating" />
      </div>
    </form>
  );
};
