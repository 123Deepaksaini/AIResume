import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Route, Routes } from "react-router";
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
import Login from "./pages/Login";
import { AuthProvider } from "./context/AuthContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <BrowserRouter>
      <Toaster />
      <Routes>
        <Route path="/" element={<Root />}>
          <Route path="" element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="services" element={<Services />} />
          <Route path="contact" element={<Contact />} />
          <Route path="generate-resume" element={<GenerateResume />} />
          <Route path="interview-prep" element={<InterviewPrep />} />
          <Route path="career-insights" element={<CareerInsights />} />
          <Route path="profile" element={<Profile />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
