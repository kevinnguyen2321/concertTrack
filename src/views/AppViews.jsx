import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Home } from '../components/Home';
import { useEffect, useState } from 'react';
import { MyShows } from '../components/MyShows';

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
        <Route
          path="my-shows"
          element={<MyShows currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
