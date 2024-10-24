'use client';  // Use this to mark the file as a Client Component

import { useState } from 'react';
import { useRouter } from 'next/navigation';  // Use next/navigation for router
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure Firebase Auth is imported
import Link from 'next/link';  // For navigation to create account page

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      console.log('Logged in:', userCredential.user);
      router.push('/home');  // Redirect to home page after login
    } catch (error) {
      console.error('Error logging in:', error.message);
      alert('Login failed. Please check your credentials.');
    }
  };

  return (
    <div style={formStyle}>
      <h2 style={titleStyle}>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={inputStyle}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Login</button>
      </form>
      <p style={linkTextStyle}>
        Don't have an account yet? 
        <Link href="/create-account" style={linkStyle}> Create one</Link>
      </p>
    </div>
  );
}

// Minimalistic Style for Login Form
const formStyle = {
  textAlign: 'center',
  marginTop: '100px',
};

const titleStyle = {
  color: '#2c3e50',  // Dark grey for title
  fontSize: '1.8rem',  // Smaller font for minimalistic design
  marginBottom: '20px',
};

const inputStyle = {
  padding: '10px',
  margin: '10px',
  fontSize: '1rem',  // Smaller font size for inputs
  width: '300px',
  borderRadius: '5px',
  border: '1px solid #ddd',  // Simple border
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#007bff',  // Blue color for button
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

const linkTextStyle = {
  fontSize: '1rem',
  color: '#333',
  marginTop: '20px',
};

const linkStyle = {
  color: '#007bff',
  marginLeft: '5px',
};


//ref: chatgpt - how to intialize firebase email and password authentication.