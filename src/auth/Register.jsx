import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { createUser, getUserByEmail } from '../services/userServices';

export const Register = (props) => {
  const [user, setUser] = useState({
    email: '',
    fullName: '',
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    user.profilePic = `http://dummyimage.com/150x150/cccccc/ffffff&text=${user.fullName}`;
    createUser(user).then((createdUser) => {
      if (createdUser.hasOwnProperty('id')) {
        localStorage.setItem(
          'concert_user',
          JSON.stringify({
            id: createdUser.id,
          })
        );

        navigate('/');
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(user.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert('Account with that email address already exists');
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateCustomer = (evt) => {
    const copy = { ...user };
    copy[evt.target.id] = evt.target.value;
    setUser(copy);
  };

  return (
    <main className="container-login" style={{ textAlign: 'center' }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>ConcertTrack</h1>
        <h2>Please Register</h2>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="text"
              id="fullName"
              className="form-control"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset>
          <div className="form-group">
            <input
              onChange={updateCustomer}
              type="email"
              id="email"
              className="form-control"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <div className="login-link">
          <Link to={'/login'}>Already have an account? Sign in here</Link>
        </div>

        <fieldset>
          <div className="form-group">
            <button className="login-btn btn-info button-6" type="submit">
              Register
            </button>
          </div>
        </fieldset>
      </form>
    </main>
  );
};
