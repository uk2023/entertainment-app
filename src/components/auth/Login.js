// Login.js
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import './styles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', { // Assuming your backend API route for login is '/api/login'
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }), // Send email and password to the server
      });

      if (response.ok) {
        // If login is successful, redirect to the dashboard page or any other page
        router.push('/Home');
      } else {
        // Handle login failure
        console.error('Login failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const redirectToSignup = () => {
    router.push('/Signup'); // Redirect to signup page
  };

  return (
    <div className='icon'>
      <div className="top-movie-icon">
        {/* Add your top movie video icon here */}
        🎬
      </div>
      <div className="login-container">
        <form className="login-form" onSubmit={handleSubmit}>
          <h2 className="login-title">Login</h2>
          <div className="input-group">
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
            <input
              className="input"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button className="button" type="submit">
            Login
          </button>
          <div className="signup-text">
            Dont have an account? <a href="#" onClick={redirectToSignup}>Sign Up</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
