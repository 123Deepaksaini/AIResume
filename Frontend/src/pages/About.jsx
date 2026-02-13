import React from "react";
import { Link } from "react-router";
import {
  FaBullseye,
  FaUsers,
  FaShieldAlt,
  FaBolt,
  FaCheckCircle,
  FaArrowRight,
} from "react-icons/fa";

const pillars = [
  {
    title: "Precision Content",
    description:
      "Structured, ATS-conscious resume wording that highlights impact, not just responsibilities.",
    icon: FaBullseye,
  },
  {
    title: "User-Centered Workflow",
    description:
      "From prompt to editable form, every step is built to reduce effort and improve clarity.",
    icon: FaUsers,
  },
  {
    title: "Reliable Resume Storage",
    description:
      "Save and manage your resume versions so you can apply quickly for multiple roles.",
    icon: FaShieldAlt,
  },
];

const steps = [
  "Describe your experience, skills, and target role in plain language.",
  "AI converts raw input into a polished resume structure.",
  "Edit details, choose template style, and export to PDF.",
];

const metrics = [
  { label: "Focus", value: "Professional Quality" },
  { label: "Approach", value: "AI + Human Editing" },
  { label: "Output", value: "Application-Ready PDF" },
];

function About() {
  return (
    <main className="home-surface min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-14 md:px-10 md:pt-20">
        <div className="reveal-up glass-card rounded-3xl p-7 text-center md:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2">
            <FaBolt className="text-brand-600 text-xs" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              About AI Resume
            </span>
          </div>
          
          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight md:text-5xl" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            Built to Help You Present Your Career with <span className="text-gradient-brand">Clarity and Confidence</span>
          </h1>
          
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            AI Resume combines intelligent drafting with practical editing tools so job seekers can
            create clean, credible, and role-focused resumes without spending hours on formatting.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            {metrics.map((item) => (
              <div key={item.label} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="text-center text-xs font-semibold uppercase tracking-wider text-slate-500">{item.label}</p>
                <p className="mt-1 text-center text-sm font-bold text-slate-800">{item.value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pillars Section */}
      <section className="mx-auto max-w-7xl px-6 pb-14 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {pillars.map(({ title, description, icon: Icon }) => (
            <article key={title} className="card-premium card-premium-interactive group">
              <div className="icon-badge mb-4 transition-transform duration-300 group-hover:scale-110">
                <Icon className="text-sm" />
              </div>
              <h2 className="text-lg font-bold" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
                {title}
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How It Works & What You Get */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
          {/* How Our Platform Works */}
          <div className="card-premium">
            <h3 className="text-2xl font-black text-slate-900" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
              How Our Platform Works
            </h3>
            <ul className="mt-5 space-y-4">
              {steps.map((step, index) => (
                <li key={step} className="flex items-start gap-3">
                  <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-700">
                    {index + 1}
                  </span>
                  <p className="text-sm leading-6 text-slate-600">{step}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* What You Get */}
          <div className="card-premium bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
            <h3 className="text-2xl font-black" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
              What You Get
            </h3>
            <div className="mt-5 space-y-3">
              {[
                "Role-specific summary and skills presentation",
                "Consistent, recruiter-friendly section hierarchy",
                "Quick iteration for multiple job applications",
                "Download-ready resumes for immediate use",
              ].map((point) => (
                <div key={point} className="flex items-start gap-2 rounded-xl border border-slate-700 bg-slate-800/70 px-3 py-3">
                  <FaCheckCircle className="mt-0.5 text-emerald-400" />
                  <p className="text-sm text-slate-200">{point}</p>
                </div>
              ))}
            </div>

            <div className="mt-7 text-center">
              <Link to="/generate-resume" className="btn-primary inline-flex items-center gap-2">
                Generate Your Resume
                <FaArrowRight className="text-xs" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
