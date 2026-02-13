import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router";
import About from "./pages/About";
import Home from "./pages/Home";
import Root from "./pages/Root";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import GenerateResume from "./pages/GenerateResume";
import InterviewPrep from "./pages/InterviewPrep";
import CareerInsights from "./pages/CareerInsights";
import Profile from "./pages/Profile";
import ResetPassword from "./pages/ResetPassword";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

function ProtectedRoute() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="p-6 text-center text-sm text-slate-600">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/?auth=login" replace />;
  }

  return <Outlet />;
}

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Navigate to="/?auth=login" replace />} />
          <Route path="reset-password" element={<ResetPassword />} />

          <Route element={<ProtectedRoute />}>
            <Route path="services" element={<Services />} />
            <Route path="contact" element={<Contact />} />
            <Route path="generate-resume" element={<GenerateResume />} />
            <Route path="interview-prep" element={<InterviewPrep />} />
            <Route path="career-insights" element={<CareerInsights />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
