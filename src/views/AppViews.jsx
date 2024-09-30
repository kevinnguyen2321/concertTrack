import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Home } from '../components/Home';
import { NewConcert } from '../components/NewConcert';
import { Login } from '../auth/Login';
import { Register } from '../auth/Register';
import { useEffect, useState } from 'react';

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
        <Route index element={<Home />} />
        <Route path="new-concert" element={<NewConcert />} />
      </Route>
    </Routes>
  );
};
