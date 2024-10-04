import { useEffect, useState } from 'react';
import './ArtistInfo.css';
import { fetchRelatedArtists } from '../../services/artistServices';

export const ArtistInfo = ({ isArtistModalOpen, artist, closeArtistModal }) => {
  const [similarArtists, setSimilarArtists] = useState([]);

  useEffect(() => {
    if (artist.id) {
      fetchRelatedArtists(artist.id).then((similarArtistsArr) => {
        const firstFourSimilarArtistsArr = [];
        for (let i = 0; i < 4; i++) {
          const similarArtistObj = similarArtistsArr[i];
          firstFourSimilarArtistsArr.push(similarArtistObj);
        }
        setSimilarArtists(firstFourSimilarArtistsArr);
      });
    }
  }, [artist]);

  const artistGenres =
    artist && artist.genres
      ? artist.genres
          .map((genre) => genre.replace(/\b\w/g, (char) => char.toUpperCase()))
          .join(', ')
      : 'No genres available';

  if (!isArtistModalOpen) {
    return null;
  }
  return (
    <div className="view-artist-modal-overlay" onClick={closeArtistModal}>
      <div className="view-artist-modal-content">
        <div className="artist-info-wrapper">
          <button className="close-btn" onClick={closeArtistModal}>
            X
          </button>
          <h2>{artist.name}</h2>
          <img className="artist-info-pic" src={artist.images[1].url} />
          <p>
            <span>Genres:</span> {artistGenres}
          </p>
        </div>
        <div className="similar-artist-wrapper">
          <div className="similar-artist-header">
            <h2>Similar Artists</h2>
          </div>

          <div className="similar-artist-card-wrapper">
            {similarArtists.map((similarArtist) => {
              return (
                <div className="similar-artist-card" key={similarArtist.id}>
                  <h3>{similarArtist.name}</h3>
                  <img
                    src={
                      similarArtist.images[2]
                        ? similarArtist.images[2].url
                        : `http://dummyimage.com/150x150/cccccc/ffffff&text=${similarArtist.name}`
                    }
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
