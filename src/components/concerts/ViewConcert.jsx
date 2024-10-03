import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConcertByConcertId } from '../../services/concertServices';
import './ViewConcert.css';
import { fetchArtist } from '../../services/artistServices';
import { ArtistInfo } from '../artist/ArtistInfo';

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

  //Function to format date to MM/DD/YYY format//
  const formatDate = (dateStr) => {
    const dateObj = new Date(dateStr);

    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0'); // getMonth() is zero-based
    const day = dateObj.getDate().toString().padStart(2, '0');
    const year = dateObj.getFullYear();

    const formattedDate = `${month}/${day}/${year}`;
    return formattedDate;
  };

  const handleOpenArtistModal = () => setIsArtistModalOpen(true);
  const handleCloseArtistModal = () => setIsArtistModalOpen(false);

  return (
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
      <div>
        <p>
          <span>Artist:</span>
          {concert.artist}
        </p>
      </div>

      <div>
        <p>
          <span>Date:</span>
          {formatDate(concert.date)}
        </p>
      </div>
      <div>
        <p>
          <span>Venue:</span>
          {concert.venue}
        </p>
      </div>
      <div>
        <p>
          <span>Rating:</span>
          {concert.rating}
        </p>
      </div>
      <ArtistInfo
        isArtistModalOpen={isArtistModalOpen}
        closeArtistModal={handleCloseArtistModal}
        artist={artist}
      />
    </div>
  );
};
