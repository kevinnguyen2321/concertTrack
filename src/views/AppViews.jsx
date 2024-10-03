import { Outlet, Route, Routes } from 'react-router-dom';
import { Home } from '../components/home/Home';
import { useEffect, useState } from 'react';
import { MyShows } from '../components/shows/MyShows';
import { ViewConcert } from '../components/concerts/ViewConcert';
import { NavBar } from '../components/nav/NavBar';

export const AppViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localConcertUser = localStorage.getItem('concert_user');
    const concertUserObject = JSON.parse(localConcertUser);

    setCurrentUser(concertUserObject);
  }, []);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Home currentUser={currentUser} />} />
        <Route path="my-shows">
          <Route index element={<MyShows currentUser={currentUser} />} />
          <Route path=":concertId" element={<ViewConcert />} />
        </Route>
      </Route>
    </Routes>
  );
};
