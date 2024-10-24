'use client';  // Use this to mark the file as a Client Component

import { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase'; // Ensure Firebase Auth is imported
import { useRouter } from 'next/navigation';  // Use next/navigation for router

export default function CreateAccount() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const router = useRouter();
  const [error, setError] = useState('');

  const handleCreateAccount = async (e) => {
    e.preventDefault();
    
    // Check if passwords match
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Account created:', userCredential.user);
      router.push('/login');  // Redirect to login page after successful account creation
    } catch (error) {
      console.error('Error creating account:', error.message);
      setError('Failed to create account. Please try again.');
    }
  };

  return (
    <div style={formStyle}>
      <h2 style={titleStyle}>Create Account</h2>
      {error && <p style={errorStyle}>{error}</p>}
      <form onSubmit={handleCreateAccount}>
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
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          style={inputStyle}
        />
        <button type="submit" style={buttonStyle}>Create Account</button>
      </form>
    </div>
  );
}

// Minimalistic Style for Create Account Form
const formStyle = {
  textAlign: 'center',
  marginTop: '100px',
};

const titleStyle = {
  color: '#2c3e50',
  fontSize: '1.8rem',
  marginBottom: '20px',
};

const inputStyle = {
  padding: '10px',
  margin: '10px',
  fontSize: '1rem',
  width: '300px',
  borderRadius: '5px',
  border: '1px solid #ddd',
};

const buttonStyle = {
  padding: '10px 20px',
  fontSize: '1rem',
  backgroundColor: '#007bff',
  color: 'white',
  border: 'none',
  cursor: 'pointer',
  borderRadius: '5px',
  transition: 'background-color 0.3s ease',
};

const errorStyle = {
  color: 'red',
  fontSize: '1rem',
  marginBottom: '10px',
};


//ref: chatgpt - how to intialize firebase email and password authentication.