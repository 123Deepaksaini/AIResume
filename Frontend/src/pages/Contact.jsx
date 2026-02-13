import React from "react";
import { Link } from "react-router";
import { FaEnvelope, FaGlobe, FaHeadset, FaArrowRight } from "react-icons/fa";

function Contact() {
  const quickLinks = [
    { to: "/", label: "Home" },
    { to: "/about", label: "About" },
    { to: "/services", label: "Services" },
    { to: "/interview-prep", label: "Interview Prep" },
    { to: "/generate-resume", label: "Generate Resume" },
  ];

  return (
    <main className="home-surface min-h-screen text-slate-900">
      <section className="mx-auto max-w-6xl px-6 pb-16 pt-14 md:px-10 md:pt-20">
        <div className="reveal-up rounded-3xl border border-slate-200/70 bg-white/90 p-7 text-center shadow-xl backdrop-blur md:p-10">
          <h1 className="text-4xl font-black md:text-5xl" style={{ fontFamily: '"Space Grotesk", "Segoe UI", sans-serif' }}>
            Contact & Support
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Have product questions, feedback, or support requests? Reach out and we will help you quickly.
          </p>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-16 md:grid-cols-2 md:px-10">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: '"Space Grotesk", "Segoe UI", sans-serif' }}>
            Get In Touch
          </h2>
          <div className="mt-6 space-y-4">
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <FaEnvelope className="mt-1 text-sky-600" />
              <div>
                <p className="font-semibold text-slate-900">Email</p>
                <p className="text-sm text-slate-600">support@airesumebuilder.com</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <FaHeadset className="mt-1 text-pink-600" />
              <div>
                <p className="font-semibold text-slate-900">Support</p>
                <p className="text-sm text-slate-600">24x7 product and usage support</p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
              <FaGlobe className="mt-1 text-emerald-600" />
              <div>
                <p className="font-semibold text-slate-900">Website</p>
                <p className="text-sm text-slate-600">www.airesumebuilder.com</p>
              </div>
            </div>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm md:p-8">
          <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: '"Space Grotesk", "Segoe UI", sans-serif' }}>
            Quick Navigation
          </h2>
          <div className="mt-6 space-y-2">
            {quickLinks.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className="flex items-center justify-between rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 hover:border-sky-400 hover:text-sky-700"
              >
                {item.label}
                <FaArrowRight className="text-xs" />
              </Link>
            ))}
          </div>

          <div className="mt-7 rounded-xl border border-slate-200 bg-slate-900 p-5 text-white">
            <p className="text-sm text-slate-200">Ready to create your next resume?</p>
            <Link to="/generate-resume" className="btn mt-3 border-0 bg-sky-600 text-white hover:bg-sky-700">
              Start Building
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}

export default Contact;
