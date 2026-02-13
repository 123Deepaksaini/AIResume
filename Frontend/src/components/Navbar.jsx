import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import toast from "react-hot-toast";
import { FaDownload, FaTrash } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getResumesByUserEmail, deleteResume } from "../api/ResumeService";
import { downloadResumePdf } from "../utils/resumePdf";

function Navbar() {
  const location = useLocation();
  const [isBright, setIsBright] = useState(() => {
    if (typeof window === "undefined") return true;
    return window.localStorage.getItem("app_theme_mode") !== "dark";
  });
  const {
    user,
    isAuthenticated,
    login,
    signup,
    forgotPassword,
    resetPassword,
    continueWithGoogle,
    logout,
  } = useAuth();

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState("login");
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const [authError, setAuthError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [savedResumes, setSavedResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/interview-prep", label: "Interview Prep" },
    { to: "/generate-resume", label: "Generate Resume" },
    { to: "/career-insights", label: "Career Insights" },
  ];

  useEffect(() => {
    if (isAuthenticated && showProfileDropdown) {
      fetchUserResumes();
    }
  }, [isAuthenticated, showProfileDropdown]);

  useEffect(() => {
    setShowProfileDropdown(false);
  }, [location.pathname]);

  const closeMobileDropdown = () => {
    setShowProfileDropdown(false);
    const active = document.activeElement;
    if (active && typeof active.blur === "function") {
      active.blur();
    }
  };

  const toggleNavbarBrightness = () => {
    const next = !isBright;
    setIsBright(next);
    window.localStorage.setItem("app_theme_mode", next ? "light" : "dark");
  };

  useEffect(() => {
    if (typeof document === "undefined") return;
    const root = document.documentElement;
    if (isBright) {
      root.classList.remove("app-theme-dark");
    } else {
      root.classList.add("app-theme-dark");
    }
  }, [isBright]);

  const fetchUserResumes = async () => {
    try {
      setLoadingResumes(true);
      const resumes = await getResumesByUserEmail(user.email);
      setSavedResumes(resumes);
    } catch {
      toast.error("Error loading resumes");
    } finally {
      setLoadingResumes(false);
    }
  };

  const resetAuthForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setResetCode("");
    setNewPassword("");
    setConfirmNewPassword("");
    setAuthError("");
  };

  const openAuthMode = (mode) => {
    resetAuthForm();
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const closeAuthModal = () => {
    setShowAuthModal(false);
    resetAuthForm();
  };

  const handleLogin = async () => {
    setAuthError("");
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success("Welcome back");
      closeAuthModal();
    } catch (error) {
      setAuthError(error?.message || "Login failed");
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignup = async () => {
    setAuthError("");
    if (!name.trim()) {
      setAuthError("Please enter your full name.");
      return;
    }
    if (password.length < 6) {
      setAuthError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setAuthError("Passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await signup(name, email, password);
      toast.success("Account created successfully");
      setPassword("");
      setConfirmPassword("");
      setAuthMode("login");
    } catch (error) {
      setAuthError(error?.message || "Signup failed");
      toast.error("Signup failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSendResetCode = async () => {
    setAuthError("");
    setIsLoading(true);
    try {
      await forgotPassword(email);
      toast.success("Code sent successfully to your Gmail.");
      setAuthMode("reset");
    } catch (error) {
      setAuthError(error?.message || "Failed to send reset code");
      toast.error("Failed to send reset code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleResetPassword = async () => {
    setAuthError("");
    if (newPassword.length < 6) {
      setAuthError("New password must be at least 6 characters.");
      return;
    }
    if (newPassword !== confirmNewPassword) {
      setAuthError("New passwords do not match.");
      return;
    }

    setIsLoading(true);
    try {
      await resetPassword(email, resetCode, newPassword);
      toast.success("Password reset successful. Please login.");
      setAuthMode("login");
      setPassword("");
      setResetCode("");
      setNewPassword("");
      setConfirmNewPassword("");
    } catch (error) {
      setAuthError(error?.message || "Reset failed");
      toast.error("Reset failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueWithGoogle = async () => {
    setAuthError("");
    setIsLoading(true);
    try {
      await continueWithGoogle();
      toast.success("Logged in with Google");
      closeAuthModal();
    } catch (error) {
      setAuthError(error?.message || "Google login failed");
      toast.error("Google login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    if (authMode === "login") {
      await handleLogin();
      return;
    }
    if (authMode === "signup") {
      await handleSignup();
      return;
    }
    if (authMode === "forgot") {
      await handleSendResetCode();
      return;
    }
    if (authMode === "reset") {
      await handleResetPassword();
    }
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    logout();
    toast.success("Logged out");
  };

  const handleDeleteResume = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteResume(id);
      setSavedResumes(savedResumes.filter((r) => r.id !== id));
      toast.success("Resume deleted");
    } catch {
      toast.error("Error deleting resume");
    }
  };

  const handleDownloadPdf = (resume) => {
    setDownloadingId(resume.id);
    try {
      downloadResumePdf(resume, String(resume.id));
      toast.success("PDF downloaded");
    } catch {
      toast.error("Error downloading PDF");
    } finally {
      setDownloadingId(null);
    }
  };

  const modalTitle = {
    login: "Welcome Back",
    signup: "Create Account",
    forgot: "Forgot Password",
    reset: "Reset Password",
  }[authMode];

  const navbarThemeClass = isBright
    ? "border-slate-200 bg-white/95 text-slate-900 backdrop-brightness-110"
    : "border-slate-700 bg-slate-900/95 text-white backdrop-brightness-100";
  const navLinkClass = isBright
    ? "rounded-lg text-slate-700 hover:text-brand-600"
    : "rounded-lg text-slate-100 hover:text-brand-300";
  const brandTextClass = isBright ? "text-slate-900" : "text-white";
  const loginBtnClass = isBright
    ? "btn btn-sm btn-outline border-slate-300 text-slate-700"
    : "btn btn-sm btn-outline border-slate-600 text-white hover:bg-slate-800";

  return (
    <>
      <div
        className={`fixed inset-x-0 top-0 z-50 border-b shadow-sm backdrop-blur transition-all ${navbarThemeClass}`}
      >
        <div className="navbar mx-auto w-full max-w-7xl px-4 md:px-6">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content z-[1] mt-3 w-60 rounded-xl border border-slate-200 bg-white p-2 shadow">
              {navLinks.map((item) => (
                <li key={item.label}>
                  {item.external ? (
                    <a href={item.to} target="_blank" rel="noreferrer" onClick={closeMobileDropdown}>{item.label}</a>
                  ) : (
                    <Link to={item.to} onClick={closeMobileDropdown}>{item.label}</Link>
                  )}
                </li>
              ))}

              {isAuthenticated ? (
                <>
                  <li><Link to="/profile" onClick={closeMobileDropdown}>My Profile</Link></li>
                  <li><button onClick={() => { closeMobileDropdown(); handleLogout(); }} className="text-brand-600">Logout</button></li>
                </>
              ) : (
                <>
                  <li><button onClick={() => { closeMobileDropdown(); openAuthMode("login"); }}>Login</button></li>
                  <li><button onClick={() => { closeMobileDropdown(); openAuthMode("signup"); }}>Sign Up</button></li>
                </>
              )}
            </ul>
          </div>

          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={toggleNavbarBrightness}
              className="btn btn-ghost btn-sm"
              title={isBright ? "Switch to dark mode" : "Switch to light mode"}
              aria-label="Toggle theme"
            >
              {isBright ? (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              )}
            </button>
            <Link to="/" className={`btn btn-ghost text-xl font-black ${brandTextClass}`} style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
              AI Resume
            </Link>
          </div>
        </div>

        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal gap-1 px-1">
            {navLinks.map((item) => (
              <li key={item.label}>
                {item.external ? (
                  <a href={item.to} target="_blank" rel="noreferrer" className={navLinkClass}>{item.label}</a>
                ) : (
                  <Link to={item.to} className={navLinkClass} onClick={() => setShowProfileDropdown(false)}>{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="navbar-end">
          {isAuthenticated ? (
            <div className="relative">
              <button className="flex items-center gap-2" onClick={() => setShowProfileDropdown(!showProfileDropdown)}>
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-600 text-sm font-bold text-white">
                  {user?.name?.charAt(0).toUpperCase()}
                </div>
              </button>

              {showProfileDropdown && (
                <div className="absolute right-0 top-full z-50 mt-2 w-72 rounded-xl border border-slate-200 bg-white shadow-xl">
                  <div className="border-b border-slate-200 p-3">
                    <p className="font-semibold text-slate-900 truncate">{user?.name}</p>
                    <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                  </div>

                  <div className="max-h-52 overflow-y-auto p-2">
                    <p className="px-1 pb-1 text-xs font-semibold text-slate-500">MY RESUMES</p>
                    {loadingResumes ? (
                      <div className="flex justify-center p-2"><span className="loading loading-spinner loading-xs"></span></div>
                    ) : savedResumes.length > 0 ? (
                      <ul className="space-y-1">
                        {savedResumes.map((resume) => (
                          <li key={resume.id} className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-2 text-xs">
                            <span className="truncate pr-2">{resume.fullName || "Untitled"}</span>
                            <div className="flex items-center gap-1">
                              <button onClick={() => handleDownloadPdf(resume)} disabled={downloadingId === resume.id} className="btn btn-ghost btn-xs text-emerald-600">
                                {downloadingId === resume.id ? <span className="loading loading-spinner loading-xs"></span> : <FaDownload className="h-3 w-3" />}
                              </button>
                              <button onClick={(e) => handleDeleteResume(resume.id, e)} className="btn btn-ghost btn-xs text-brand-600">
                                <FaTrash className="h-3 w-3" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="py-2 text-center text-xs text-slate-500">No resumes saved</p>
                    )}
                  </div>

                  <div className="flex gap-2 border-t border-slate-200 p-2">
                    <Link to="/generate-resume" className="btn btn-sm flex-1 border-0 bg-brand-600 text-white hover:bg-brand-700" onClick={() => setShowProfileDropdown(false)}>
                      New Resume
                    </Link>
                    <button onClick={handleLogout} className="btn btn-sm border-0 bg-slate-200 text-slate-700 hover:bg-slate-300">
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {showProfileDropdown && <div className="fixed inset-0 z-40" onClick={() => setShowProfileDropdown(false)}></div>}
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <button onClick={() => openAuthMode("login")} className={loginBtnClass}>Login</button>
              <button onClick={() => openAuthMode("signup")} className="btn btn-sm border-0 bg-brand-600 text-white hover:bg-brand-700">Sign Up</button>
            </div>
          )}
        </div>
        </div>
      </div>

      {showAuthModal && (
        <div className="modal modal-open">
          <div className="modal-box max-w-md rounded-3xl border border-slate-200 bg-white p-0">
            <div className="rounded-t-3xl border-b border-slate-200 bg-slate-50 px-6 py-5">
              <h3 className="text-2xl font-black text-slate-900" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>{modalTitle}</h3>
              <p className="mt-1 text-sm text-slate-600">Use your credentials to continue. Google and reset flows are available below.</p>
            </div>

            <div className="px-6 py-5">
              <form onSubmit={handleAuthSubmit}>
                {authMode === "signup" && (
                  <div className="form-control">
                    <label className="label"><span className="label-text font-semibold text-slate-700">Full Name</span></label>
                    <input type="text" className="input-premium" value={name} onChange={(e) => setName(e.target.value)} required />
                  </div>
                )}

                {(authMode === "login" || authMode === "signup" || authMode === "forgot" || authMode === "reset") && (
                  <div className="form-control mt-4">
                    <label className="label"><span className="label-text font-semibold text-slate-700">Email</span></label>
                    <input type="email" className="input-premium" value={email} onChange={(e) => setEmail(e.target.value)} required />
                  </div>
                )}

                {(authMode === "login" || authMode === "signup") && (
                  <div className="form-control mt-4">
                    <label className="label"><span className="label-text font-semibold text-slate-700">Password</span></label>
                    <input type="password" className="input-premium" value={password} onChange={(e) => setPassword(e.target.value)} required />
                  </div>
                )}

                {authMode === "signup" && (
                  <div className="form-control mt-4">
                    <label className="label"><span className="label-text font-semibold text-slate-700">Confirm Password</span></label>
                    <input type="password" className="input-premium" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
                  </div>
                )}

                {authMode === "reset" && (
                  <>
                    <div className="form-control mt-4">
                      <label className="label"><span className="label-text font-semibold text-slate-700">Reset Code</span></label>
                      <input type="text" className="input-premium" value={resetCode} onChange={(e) => setResetCode(e.target.value)} required />
                    </div>
                    <div className="form-control mt-4">
                      <label className="label"><span className="label-text font-semibold text-slate-700">New Password</span></label>
                      <input type="password" className="input-premium" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
                    </div>
                    <div className="form-control mt-4">
                      <label className="label"><span className="label-text font-semibold text-slate-700">Confirm New Password</span></label>
                      <input type="password" className="input-premium" value={confirmNewPassword} onChange={(e) => setConfirmNewPassword(e.target.value)} required />
                    </div>
                  </>
                )}

                {authError && <p className="mt-3 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">{authError}</p>}

                <div className="mt-4 text-sm text-slate-600">
                  {authMode === "signup" && (
                    <p>Already have an account? <button type="button" className="font-semibold text-brand-600" onClick={() => setAuthMode("login")}>Login</button></p>
                  )}
                  {authMode === "login" && (
                    <div className="flex items-center justify-between gap-3">
                      <p>New user? <button type="button" className="font-semibold text-brand-600" onClick={() => setAuthMode("signup")}>Sign Up</button></p>
                      <p><button type="button" className="font-semibold text-brand-600" onClick={() => setAuthMode("forgot")}>Forgot Password?</button></p>
                    </div>
                  )}
                  {authMode === "forgot" && (
                    <p><button type="button" className="font-semibold text-brand-600" onClick={() => setAuthMode("login")}>Back to login</button></p>
                  )}
                  {authMode === "reset" && (
                    <p><button type="button" className="font-semibold text-brand-600" onClick={() => setAuthMode("login")}>Back to login</button></p>
                  )}
                </div>

                {(authMode === "login" || authMode === "signup") && (
                  <>
                    <div className="my-4 flex items-center gap-3">
                      <div className="h-px flex-1 bg-slate-200"></div>
                      <span className="text-xs font-semibold uppercase text-slate-500">or</span>
                      <div className="h-px flex-1 bg-slate-200"></div>
                    </div>
                    <button type="button" onClick={handleContinueWithGoogle} disabled={isLoading} className="btn w-full border border-slate-300 bg-white text-slate-700 hover:bg-slate-50">
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                      </svg>
                      Continue with Google
                    </button>
                  </>
                )}

                <div className="mx-auto mt-5 grid w-full max-w-sm grid-cols-2 gap-3">
                  <button type="button" className="btn w-full btn-outline border-slate-300 text-slate-700" onClick={closeAuthModal}>Cancel</button>
                  <button type="submit" className="btn w-full border-0 bg-brand-600 text-white hover:bg-brand-700" disabled={isLoading}>
                    {isLoading ? (
                      <span className="loading loading-spinner loading-sm"></span>
                    ) : authMode === "signup" ? (
                      "Create Account"
                    ) : authMode === "forgot" ? (
                      "Send Reset Code"
                    ) : authMode === "reset" ? (
                      "Reset Password"
                    ) : (
                      "Login"
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop" onClick={closeAuthModal}></div>
        </div>
      )}
    </>
  );
}

export default Navbar;
