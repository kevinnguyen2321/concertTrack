import { Outlet, Route, Routes } from 'react-router-dom';
import { NavBar } from '../components/NavBar';
import { Home } from '../components/Home';
import { NewConcert } from '../components/NewConcert,';

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
        <Route index element={<Home />} />
        <Route path="new-concert" element={<NewConcert />} />
      </Route>
    </Routes>
  );
};
