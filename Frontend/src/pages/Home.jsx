import React from "react";
import { Link } from "react-router";
import { FaArrowRight, FaBolt, FaFileAlt, FaShieldAlt, FaChartLine, FaClock } from "react-icons/fa";

const highlights = [
  {
    title: "AI-Powered Drafting",
    description: "Convert raw experience into ATS-friendly, role-specific resume copy in minutes.",
    icon: FaBolt,
  },
  {
    title: "Professional Templates",
    description: "Choose modern layouts designed for hiring managers, startups, and enterprise roles.",
    icon: FaFileAlt,
  },
  {
    title: "Secure Resume History",
    description: "Save, revisit, and download your resumes whenever you need to apply fast.",
    icon: FaShieldAlt,
  },
];

const metrics = [
  { label: "Draft Time", value: "< 5 min" },
  { label: "Resume Variants", value: "Multiple" },
  { label: "Workflow", value: "End-to-End" },
];

const steps = [
  {
    title: "Describe Your Profile",
    detail: "Add your background, skills, projects, and target role in plain language.",
  },
  {
    title: "Refine with Smart Form",
    detail: "Edit generated sections quickly with structured fields for better quality.",
  },
  {
    title: "Download and Apply",
    detail: "Export polished PDFs and apply confidently across roles.",
  },
];

function Home() {
  return (
    <main className="home-surface min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20 pt-14 md:px-10 md:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left Content */}
          <div className="reveal-up">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2">
              <FaChartLine className="text-brand-600 text-xs" />
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-brand-700">
                Career Acceleration Toolkit
              </span>
            </div>
            
            <h1 className="mb-5 text-4xl font-black leading-tight md:text-6xl" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
              Build Interview-Ready Resumes with a <span className="text-gradient">Professional AI Workflow</span>
            </h1>
            
            <p className="max-w-2xl text-base leading-7 text-slate-600 md:text-lg">
              From first draft to final PDF, AI Resume helps you craft polished, structured, and role-focused resumes that stand out.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link to="/generate-resume" className="btn-primary flex items-center gap-2">
                Start Building
                <FaArrowRight className="text-xs" />
              </Link>
              <Link to="/services" className="btn-secondary flex items-center gap-2">
                View Services
                <FaArrowRight className="text-xs" />
              </Link>
            </div>

            {/* Metrics */}
            <div className="mt-10 grid gap-3 sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="glass-card rounded-2xl px-4 py-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">{metric.label}</p>
                  <p className="mt-1 text-lg font-bold text-slate-800">{metric.value}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Card */}
          <div className="relative floating">
            <div className="glass-card rounded-3xl p-6 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <h2 className="text-xl font-bold" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
                  Resume Quality Snapshot
                </h2>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
                  Optimized
                </span>
              </div>

              <div className="space-y-4">
                {[
                  ["Structure", "Professional"],
                  ["ATS Readability", "High"],
                  ["Role Alignment", "Strong"],
                ].map(([label, value]) => (
                  <div key={label} className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
                    <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">{label}</p>
                    <p className="mt-1 text-sm font-semibold text-slate-800">{value}</p>
                  </div>
                ))}
              </div>

              <div className="mt-5 rounded-xl border border-brand-100 bg-brand-50 px-4 py-3">
                <div className="flex items-center gap-2 font-semibold text-brand-800">
                  <FaClock className="text-xs" />
                  Ready faster than manual formatting
                </div>
                <p className="mt-1 text-sm text-brand-700">Generate, edit, and export without switching tools.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Section */}
      <section className="mx-auto max-w-7xl px-6 pb-16 md:px-10">
        <div className="grid gap-5 md:grid-cols-3">
          {highlights.map(({ title, description, icon: Icon }) => (
            <article key={title} className="card-premium card-premium-interactive group">
              <div className="icon-badge mb-4 transition-transform duration-300 group-hover:scale-110">
                <Icon className="text-sm" />
              </div>
              <h3 className="text-lg font-bold" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>{title}</h3>
              <p className="mt-2 text-sm leading-6 text-slate-600">{description}</p>
            </article>
          ))}
        </div>
      </section>

      {/* How It Works Section */}
      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="card-premium">
          <div className="mb-7 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
              How It Works
            </h2>
            <Link to="/generate-resume" className="text-sm font-semibold text-brand-600 hover:text-brand-700">
              Try Now →
            </Link>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            {steps.map((step, idx) => (
              <div key={step.title} className="rounded-2xl border border-slate-100 bg-slate-50 p-5">
                <div className="mb-2 text-xs font-bold uppercase tracking-[0.16em] text-brand-600">
                  Step 0{idx + 1}
                </div>
                <h3 className="text-base font-bold text-slate-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{step.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}

export default Home;
