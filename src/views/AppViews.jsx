import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Home } from '../components/Home';

export const AppViews = () => {
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
        <Route path="home" element={<Home />} />
      </Route>
    </Routes>
  );
};
