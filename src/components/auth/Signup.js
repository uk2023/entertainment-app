// Signup.js

import React, { useState } from 'react';
import { useRouter } from 'next/router';
import './styles.css';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== repeatPassword) {
      alert("Passwords don't match");
      return;
    }

    try {
      const response = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        alert('Signup successful!');
        // Redirect or handle success as needed
      } else {
        alert('Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
    }
  };

  const redirectToLogin = () => {
    router.push('/Login'); // Redirect to signup page
  };

  return (
    <div className="login-container">
      <h2 className="login-title">Sign Up</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="input-group">
          <label className="input-label" htmlFor="email">
            Email address
          </label>
          <input
            className="input"
            type="email"
            id="email"
            placeholder="Email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="password">
            Password
          </label>
          <input
            className="input"
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="input-group">
          <label className="input-label" htmlFor="repeatPassword">
            Repeat Password
          </label>
          <input
            className="input"
            type="password"
            id="repeatPassword"
            placeholder="Repeat password"
            value={repeatPassword}
            onChange={(e) => setRepeatPassword(e.target.value)}
          />
        </div>
        <button className="button" type="submit">
          Sign Up
        </button>
        <div className="signup-text">
          Already have an account? <a href="#" onClick={redirectToLogin}> Login</a>
        </div>
      </form>
    </div>
  );
};

export default Signup;
