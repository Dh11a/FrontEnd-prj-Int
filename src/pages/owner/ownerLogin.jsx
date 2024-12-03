import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import axios from 'axios';

function OwnerAuthPage({ isLogin, userType }) {
  const [name, setName] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [messageColor, setMessageColor] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const endpoint = userType === 'owner' ? 'owner' : 'client';
    const url = `http://localhost:5000/${endpoint}/${isLogin ? 'login' : 'signup'}`;

    const requestData = {
      email,
      password,
      ...(userType === 'owner' ? { name, phone } : { firstName, lastName, phone })
    };

    axios
      .post(url, requestData)
      .then((res) => {
        console.log('Success:', res.data);
        const idKey = userType === 'owner' ? "ownerId" : "clientId";
        localStorage.setItem(idKey, res.data[idKey]);

        if (isLogin) {
          setMessage('Login successful!');
          setMessageColor('green');
          navigate(userType === 'owner' ? `/owner-home-page` : `/destinations`);
        } else {
          setMessage('Registration successful! Please log in.');
          setMessageColor('green');

          // Clear input fields after successful signup
          setName('');
          setFirstName('');
          setLastName('');
          setEmail('');
          setPassword('');
          setPhone('');

          // Redirect to login page after 2 seconds
          setTimeout(() => {
            navigate(`/login-${userType}`);
          }, 2000);
        }
      })
      .catch((err) => {
        console.error('Error:', err);

        if (isLogin && err.response && err.response.data.message === 'Invalid credentials') {
          setMessage('Your credentials are incorrect. Please verify and try again.');
          setMessageColor('red');
        } else {
          setMessage('This email is already registered. Please use a different email.');
          setMessageColor('orange');
        }
      });
  };

  return (
    <StyledWrapper>
      <div className="auth-container">
        <div className="auth-box">
          <h2>{isLogin ? 'Login' : 'Sign Up'}</h2>
          <form onSubmit={handleSubmit}>
            {!isLogin && userType === 'owner' && (
              <div className="form-group">
                <label>Name:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            )}
            {!isLogin && userType === 'client' && (
              <>
                <div className="form-group">
                  <label>First Name:</label>
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label>Last Name:</label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </>
            )}
            <div className="form-group">
              <label>Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label>Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {!isLogin && (
              <div className="form-group">
                <label>Phone:</label>
                <input
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
            )}
            <button type="submit" className="submit-btn">
              {isLogin ? 'Login' : 'Sign Up'}
            </button>
          </form>

          {message && <p className="message" style={{ color: messageColor }}>{message}</p>}

          <p className="toggle-view" onClick={() => navigate(isLogin ? `/signup-${userType}` : `/login-${userType}`)}>
            {isLogin
              ? "Don't have an account? Sign up here."
              : 'Already have an account? Login here.'}
          </p>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  /* Basic styles */
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
  }

  body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(135deg, #74ebd5, #acb6e5);
  }

  .auth-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }

  .auth-box {
    background-color: white;
    padding: 40px 50px;
    border-radius: 15px;
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.15);
    max-width: 400px;
    width: 100%;
    text-align: center;
  }

  .auth-box h2 {
    font-size: 24px;
    color: #333;
    margin-bottom: 20px;
  }

  .form-group {
    margin-bottom: 15px;
    text-align: left;
  }

  .form-group label {
    font-size: 14px;
    color: #555;
  }

  .form-group input {
    width: 100%;
    padding: 10px 12px;
    margin-top: 8px;
    border-radius: 8px;
    border: 1px solid #ccc;
    background-color: #f7f7f7;
  }

  .form-group input:focus {
    outline: none;
    border-color: #74ebd5;
  }

  .submit-btn {
    background-color: #74ebd5;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    width: 100%;
  }

  .submit-btn:hover {
    background-color: #acb6e5;
  }

  .toggle-view {
    margin-top: 10px;
    font-size: 14px;
    color: #333;
    cursor: pointer;
    text-decoration: underline;
  }

  /* Styling for message */
  .message {
    margin-top: 15px;
    font-size: 14px;
    font-weight: bold;
  }
`;

export default OwnerAuthPage;
