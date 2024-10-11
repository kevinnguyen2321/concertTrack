import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConcertByConcertId } from '../../services/concertServices';
import './ViewConcert.css';
import { fetchArtist } from '../../services/artistServices';
import { ArtistInfo } from '../artist/ArtistInfo';
import { format, parseISO } from 'date-fns';

export const ViewConcert = () => {
  const { concertId } = useParams();
  const [concert, setConcert] = useState({});
  const [artist, setArtist] = useState({});
  const [error, setError] = useState(null);
  const [isArtistModalOpen, setIsArtistModalOpen] = useState(false);

  useEffect(() => {
    getConcertByConcertId(concertId).then((concertArr) => {
      const concertObj = concertArr[0];
      setConcert(concertObj);
    });
  }, [concertId]);

  useEffect(() => {
    if (concert.artist) {
      fetchArtist(concert.artist)
        .then((artistArr) => {
          if (artistArr.length > 0) {
            const artistObj = artistArr[0];
            setArtist(artistObj);
          } else {
            setError('Artist not found');
          }
        })
        .catch((error) => {
          console.error(error);
          setError('Failed to fetch artist');
        });
    }
  }, [concert]);

  // Convert date to MM-dd-YYYY format and consider UTC//
  // const displayDate = format(parseISO(concert.date), 'MM-dd-yyyy');

  const handleOpenArtistModal = () => setIsArtistModalOpen(true);
  const handleCloseArtistModal = () => setIsArtistModalOpen(false);

  //Function to display rating based on amount//
  const displayRating = (rating) => {
    const starsArr = [];

    for (let i = 0; i < rating; i++) {
      starsArr.push(
        <span className="view-concert-star" key={i}>
          ★
        </span>
      );
    }

    return <div className="view-concert-stars-wrapper">{starsArr}</div>;
  };

  return (
    <div className="main-view-concert-wrapper">
      <div className="concert-wrapper">
        <h2>Concert Info</h2>
        <div className="artist-image-wrapper">
          {/* Check if artist images has loaded before rendering image */}
          {artist.images && artist.images.length > 0 && (
            <img
              className="artist-image"
              src={artist.images[0].url}
              alt="Artist pic"
              onClick={handleOpenArtistModal}
            />
          )}
          {/* If there is an error fetching artist then use dummy image */}
          {error && (
            <img
              className="artist-image"
              src={`http://dummyimage.com/150x150/cccccc/ffffff&text=${concert.artist}`}
            />
          )}
        </div>
        <div className="view-concert-info-wrapper">
          <div className="view-concert-info">
            <p>
              <span>Artist:</span>
              {concert.artist}
            </p>
          </div>

          <div className="view-concert-info">
            <p>
              <span>Date:</span>
              {concert.date
                ? format(parseISO(concert.date), 'MM/dd/yyyy')
                : 'Date not available'}
            </p>
          </div>
          <div className="view-concert-info">
            <p>
              <span>Venue:</span>
              {concert.venue}
            </p>
          </div>
          <div className="view-concert-rating-wrapper">
            <span className="view-concert-rating-text">Rating:</span>
            <div>{displayRating(concert.rating)}</div>
          </div>
          <ArtistInfo
            isArtistModalOpen={isArtistModalOpen}
            closeArtistModal={handleCloseArtistModal}
            artist={artist}
          />
        </div>
      </div>
    </div>
  );
};
