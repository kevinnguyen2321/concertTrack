import { Route, Routes } from 'react-router-dom';
import { AppViews } from './views/AppViews';
import { Register } from './auth/Register';
import { Login } from './auth/Login';
import { Authorized } from './views/Authorized';

function App() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />

      <Route
        path="*"
        element={
          <Authorized>
            <AppViews />
          </Authorized>
        }
      />
    </Routes>
  );
}

export default App;
