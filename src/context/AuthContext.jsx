import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('plateiq_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = (email, password) => {
    const userData = { email, name: email.split('@')[0] };
    setUser(userData);
    localStorage.setItem('plateiq_user', JSON.stringify(userData));
    return true;
  };

  const signup = (name, email, password) => {
    const userData = { email, name };
    setUser(userData);
    localStorage.setItem('plateiq_user', JSON.stringify(userData));
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('plateiq_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
