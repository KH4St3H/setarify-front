import React, { useState, useRef, createContext, useContext, useEffect } from 'react';
import {api} from "../api"

const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem('refreshToken');
    setAuthenticated(token != null);
    return token != null ? { token } : null;
  });

  const login = async (credentials) => {
    const response = await api.login(credentials);
    localStorage.setItem('accessToken', response.access);
    localStorage.setItem('refreshToken', response.refresh);
    setAuth({ token: response.access });
    setAuthenticated(true);
  };

  const logout = () => {
    setAuthenticated(false);
    localStorage.removeItem('token');
    setAuth(null);
    setAuthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ auth, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};



const Login = () => {
  const [credentials, setCredentials] = useState({ username: '', password: '' });
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(credentials);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h2 className="text-2xl font-bold mb-4">Login to Setarify</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Username"
            className="w-full p-2 border rounded"
            value={credentials.username}
            onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full p-2 border rounded"
            value={credentials.password}
            onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
          />
          <button type="submit" className="w-full p-2 bg-indigo-600 text-white rounded">
            Login
          </button>
        </form>
    </div>
  );
};

const LoginPage = () => {
    return (
        <AuthProvider>        
            <Login />
        </AuthProvider>
    );
}

export {Login, AuthProvider, AuthContext};