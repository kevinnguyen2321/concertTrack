import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/NavBar';

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
        <Route path="home" element={<>hizo</>} />
      </Route>
    </Routes>
  );
};
