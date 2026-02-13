import React, { createContext, useContext, useEffect, useState } from "react";
import {
  authForgotPassword,
  authGoogle,
  authLogin,
  authResetPassword,
  authSignup,
} from "../api/AuthService";

const AuthContext = createContext(null);

const USER_KEY = "user";
const TEMPLATE_KEY = "selectedTemplate";

const readJSON = (key, fallback) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const writeJSON = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

const loadGoogleScript = () => {
  return new Promise((resolve, reject) => {
    if (window.google?.accounts?.id) {
      resolve();
      return;
    }

    const existing = document.querySelector('script[data-google-identity="true"]');
    if (existing) {
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load Google script")));
      return;
    }

    const script = document.createElement("script");
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    script.dataset.googleIdentity = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load Google script"));
    document.head.appendChild(script);
  });
};

const getGoogleIdToken = async (clientId) => {
  await loadGoogleScript();

  if (!clientId) {
    throw new Error("Missing VITE_GOOGLE_CLIENT_ID");
  }

  return new Promise((resolve, reject) => {
    let settled = false;

    const timeout = setTimeout(() => {
      if (!settled) {
        settled = true;
        reject(new Error("Google sign-in timed out or was cancelled"));
      }
    }, 60000);

    window.google.accounts.id.initialize({
      client_id: clientId,
      callback: (response) => {
        if (!settled) {
          settled = true;
          clearTimeout(timeout);
          if (response?.credential) {
            resolve(response.credential);
          } else {
            reject(new Error("No Google credential received"));
          }
        }
      },
      auto_select: false,
      ux_mode: "popup",
    });

    window.google.accounts.id.prompt((notification) => {
      if (!settled && (notification.isSkippedMoment() || notification.isDismissedMoment())) {
        settled = true;
        clearTimeout(timeout);
        reject(new Error("Google sign-in was dismissed"));
      }
    });
  });
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = readJSON(USER_KEY, null);
    const storedTemplate = readJSON(TEMPLATE_KEY, null);

    if (storedUser) {
      setUser(storedUser);
    }
    if (storedTemplate) {
      setSelectedTemplate(storedTemplate);
    }

    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const data = await authLogin({ email, password });
    const publicUser = data.user;
    setUser(publicUser);
    writeJSON(USER_KEY, publicUser);
    return publicUser;
  };

  const signup = async (name, email, password) => {
    const data = await authSignup({ name, email, password });
    return data.user;
  };

  const forgotPassword = async (email) => {
    return authForgotPassword({ email });
  };

  const resetPassword = async (email, code, newPassword) => {
    return authResetPassword({ email, code, newPassword });
  };

  const continueWithGoogle = async () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const idToken = await getGoogleIdToken(clientId);
    const data = await authGoogle({ idToken });

    const publicUser = data.user;
    setUser(publicUser);
    writeJSON(USER_KEY, publicUser);
    return publicUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(USER_KEY);
  };

  const selectTemplate = (template) => {
    setSelectedTemplate(template);
    writeJSON(TEMPLATE_KEY, template);
  };

  const clearTemplate = () => {
    setSelectedTemplate(null);
    localStorage.removeItem(TEMPLATE_KEY);
  };

  const value = {
    user,
    selectedTemplate,
    login,
    signup,
    forgotPassword,
    resetPassword,
    continueWithGoogle,
    logout,
    selectTemplate,
    clearTemplate,
    loading,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}

export default AuthContext;

