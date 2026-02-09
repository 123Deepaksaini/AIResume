import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check for stored user data on mount
    const storedUser = localStorage.getItem('user');
    const storedTemplate = localStorage.getItem('selectedTemplate');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    if (storedTemplate) {
      setSelectedTemplate(JSON.parse(storedTemplate));
    }
    setLoading(false);
  }, []);

  const login = (email, password) => {
    // Simulate login - replace with actual API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = {
            id: 1,
            email: email,
            name: email.split('@')[0],
            avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`
          };
          setUser(userData);
          localStorage.setItem('user', JSON.stringify(userData));
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    localStorage.setItem('selectedTemplate', JSON.stringify(template));
  };

  const clearTemplate = () => {
    setSelectedTemplate(null);
    localStorage.removeItem('selectedTemplate');
  };

  const value = {
    user,
    selectedTemplate,
    login,
    logout,
    selectTemplate,
    clearTemplate,
    loading,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

export default AuthContext;
