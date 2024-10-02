import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getConcertByConcertId } from '../../services/concertServices';
import './ViewConcert.css';

export const ViewConcert = () => {
  const { concertId } = useParams();
  const [concert, setConcert] = useState({});

  useEffect(() => {
    getConcertByConcertId(concertId).then((concertArr) => {
      const concertObj = concertArr[0];
      setConcert(concertObj);
    });
  }, [concertId]);

  return <>heloo {concertId}</>;
};
