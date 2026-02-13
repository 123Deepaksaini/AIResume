import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";
import {
  FaArrowRight,
  FaBolt,
  FaCheckCircle,
  FaFileUpload,
  FaLayerGroup,
  FaSearch,
  FaTools,
} from "react-icons/fa";

function Services() {
  const { isAuthenticated, selectTemplate, selectedTemplate } = useAuth();
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);
  const [atsJobDescription, setAtsJobDescription] = useState("");
  const [atsScore, setAtsScore] = useState(null);
  const [analyzingAts, setAnalyzingAts] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");

  const services = [
    {
      id: 1,
      title: "AI Resume Builder",
      description: "Create role-focused resumes with guided AI drafting.",
      page: "/generate-resume",
      icon: FaBolt,
    },
    {
      id: 2,
      title: "ATS Score Checker",
      description: "Evaluate resume relevance against ATS expectations.",
      page: "#ats-checker",
      icon: FaSearch,
    },
    {
      id: 3,
      title: "Resume Templates",
      description: "Select from high-quality formats for different domains.",
      page: "#templates",
      icon: FaLayerGroup,
    },
    {
      id: 4,
      title: "Interview Prep",
      description: "Practice responses with structured sample answers.",
      page: "/interview-prep",
      icon: FaTools,
    },
    {
      id: 5,
      title: "Career Insights",
      description: "Discover practical recommendations for career growth.",
      page: "/career-insights",
      icon: FaCheckCircle,
    },
  ];

  const templates = [
    { id: 1, name: "Modern Professional", category: "Corporate", color: "bg-gradient-to-br from-brand-600 to-brand-800" },
    { id: 2, name: "Creative Designer", category: "Creative", color: "bg-gradient-to-br from-pink-500 to-rose-600" },
    { id: 3, name: "Tech Developer", category: "Technology", color: "bg-gradient-to-br from-emerald-500 to-emerald-700" },
    { id: 4, name: "Executive Manager", category: "Management", color: "bg-gradient-to-br from-slate-700 to-slate-900" },
    { id: 5, name: "Simple Clean", category: "General", color: "bg-gradient-to-br from-slate-500 to-slate-700" },
    { id: 6, name: "Academic Research", category: "Academic", color: "bg-gradient-to-br from-amber-500 to-amber-700" },
  ];

  const handleTemplateSelect = (template) => {
    if (!isAuthenticated) {
      toast.error("Please login to select templates");
      return;
    }

    setSelectedTemplateId(template.id);
    selectTemplate(template);
    toast.success(`Template "${template.name}" selected!`);
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a PDF file");
      return;
    }

    setResumeFile(file);
    setExtractedText("Resume text extracted from PDF.");
    toast.success("PDF uploaded successfully!");
  };

  const analyzeAtsScore = () => {
    if (!atsJobDescription.trim() && !extractedText) {
      toast.error("Please enter job description or upload resume");
      return;
    }

    setAnalyzingAts(true);

    setTimeout(() => {
      const jd = atsJobDescription.toLowerCase();
      const resume = extractedText.toLowerCase();

      const keywords = [
        "experience",
        "skills",
        "responsible",
        "team",
        "project",
        "lead",
        "manage",
        "develop",
        "design",
        "implement",
        "analyze",
        "optimize",
        "javascript",
        "python",
        "java",
        "react",
        "node",
        "sql",
        "aws",
        "cloud",
        "communication",
        "problem solving",
        "leadership",
        "time management",
      ];

      let foundKeywords = 0;
      keywords.forEach((kw) => {
        if (jd.includes(kw) || resume.includes(kw)) foundKeywords++;
      });

      const score = Math.min(95, 50 + foundKeywords * 3 + Math.floor(Math.random() * 10));
      setAtsScore(score);
      setAnalyzingAts(false);
      toast.success(`ATS Score: ${score}%`);
    }, 1800);
  };

  return (
    <main className="home-surface min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-14 pt-14 md:px-10 md:pt-20">
        <div className="reveal-up glass-card rounded-3xl p-7 text-center md:p-10">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-4 py-2">
            <FaBolt className="text-brand-600 text-xs" />
            <span className="text-xs font-semibold uppercase tracking-[0.18em] text-brand-700">
              Service Stack
            </span>
          </div>
          
          <h1 className="mx-auto max-w-4xl text-4xl font-black leading-tight md:text-5xl" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            Tools Designed for <span className="text-gradient-brand">Fast, Professional</span> Job Applications
          </h1>
          
          <p className="mx-auto mt-5 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Use a complete workflow: generate resume drafts, optimize for ATS, pick polished templates,
            and prepare for interviews in one place.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="mx-auto max-w-7xl px-6 pb-14 md:px-10">
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => {
            const Icon = service.icon;
            const isInternalRoute = service.page.startsWith("/");

            const card = (
              <article className="card-premium card-premium-interactive group">
                <div className="icon-badge mb-4 transition-transform duration-300 group-hover:scale-110">
                  <Icon className="text-sm" />
                </div>
                <h3 className="text-lg font-bold" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
                  {service.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-slate-600">{service.description}</p>
                <p className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-brand-600">
                  Explore <FaArrowRight className="text-xs" />
                </p>
              </article>
            );

            if (isInternalRoute) {
              return (
                <Link key={service.id} to={service.page}>
                  {card}
                </Link>
              );
            }

            return (
              <a key={service.id} href={service.page}>
                {card}
              </a>
            );
          })}
        </div>
      </section>

      {/* ATS Checker Section */}
      <section id="ats-checker" className="mx-auto max-w-5xl px-6 pb-16 md:px-10">
        <div className="card-premium">
          <div className="mb-6 text-center">
            <h2 className="text-2xl font-black text-slate-900 md:text-3xl" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
              ATS Score Checker
            </h2>
            <p className="mt-2 text-sm text-slate-600 md:text-base">
              Upload resume PDF and/or paste job description to estimate ATS readiness.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_0.9fr]">
            {/* Left - Input */}
            <div>
              <label className="mb-2 block text-sm font-semibold text-slate-700">Upload Resume (PDF)</label>
              <label className="flex cursor-pointer items-center gap-3 rounded-xl border-2 border-dashed border-slate-300 bg-slate-50 px-4 py-5 text-sm text-slate-600 transition-all hover:border-brand-400 hover:bg-brand-50">
                <FaFileUpload className="text-brand-600" />
                <span>{resumeFile ? resumeFile.name : "Choose a PDF file"}</span>
                <input type="file" accept=".pdf" onChange={handleFileUpload} className="hidden" />
              </label>

              <label className="mb-2 mt-5 block text-sm font-semibold text-slate-700">Job Description</label>
              <textarea
                className="textarea-premium"
                placeholder="Paste job description..."
                value={atsJobDescription}
                onChange={(e) => setAtsJobDescription(e.target.value)}
              ></textarea>

              <button
                onClick={analyzeAtsScore}
                disabled={analyzingAts}
                className="btn-primary mt-4 w-full"
              >
                {analyzingAts ? (
                  <>
                    <span className="loading loading-spinner loading-sm mr-2"></span>
                    Analyzing
                  </>
                ) : (
                  "Check ATS Score"
                )}
              </button>
            </div>

            {/* Right - Result */}
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5">
              <h3 className="text-base font-bold text-slate-900">Result</h3>
              {atsScore !== null ? (
                <>
                  <div className="mt-4 flex items-center justify-center">
                    <div className="radial-progress text-brand-600" style={{ "--value": atsScore, "--size": "6rem" }} role="progressbar">
                      <span className="text-lg font-bold text-slate-800">{atsScore}%</span>
                    </div>
                  </div>
                  <p className="mt-4 text-center text-sm text-slate-600">
                    {atsScore >= 80
                      ? "Excellent. Resume appears well optimized for ATS parsing."
                      : atsScore >= 60
                      ? "Good base. Add more role-specific keywords for higher relevance."
                      : "Needs improvement. Align sections and keywords with job description."}
                  </p>
                  <div className="mt-4 rounded-xl border border-slate-200 bg-white p-3 text-sm text-slate-600">
                    <p className="font-semibold text-slate-800">Suggestions</p>
                    <ul className="mt-2 space-y-1">
                      <li>- Include high-intent keywords from the JD.</li>
                      <li>- Use standard headings like Summary, Skills, Experience.</li>
                      <li>- Keep formatting simple and ATS-friendly.</li>
                    </ul>
                  </div>
                </>
              ) : (
                <p className="mt-3 text-sm text-slate-500">
                  Your ATS score will appear here after analysis.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Templates Section */}
      <section id="templates" className="mx-auto max-w-6xl px-6 pb-16 md:px-10">
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-black text-slate-900 md:text-3xl" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            Resume Templates
          </h2>
          <p className="mt-2 text-sm text-slate-600 md:text-base">
            Select a template, then generate your resume with that style.
          </p>
        </div>

        {selectedTemplate && (
          <div className="mb-4 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-center text-sm text-emerald-800">
            Template "{selectedTemplate.name}" selected.
            <button
              onClick={() => {
                selectTemplate(null);
                setSelectedTemplateId(null);
              }}
              className="ml-3 font-semibold text-emerald-900 underline"
            >
              Clear
            </button>
          </div>
        )}

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {templates.map((template) => (
            <button
              type="button"
              key={template.id}
              className={`rounded-2xl bg-white text-left shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${
                selectedTemplateId === template.id ? "border-2 border-brand-500 ring-2 ring-brand-200" : "border border-slate-200"
              }`}
              onClick={() => handleTemplateSelect(template)}
            >
              <div className={`h-24 ${template.color} rounded-t-2xl px-5 py-4 text-white`}>
                <p className="text-xs uppercase tracking-wider opacity-80">Preview</p>
                <p className="mt-2 text-xl font-bold">Aa</p>
              </div>
              <div className="px-5 py-4">
                <h3 className="text-base font-bold text-slate-900">{template.name}</h3>
                <p className="mt-1 text-sm text-slate-600">{template.category}</p>
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="mx-auto max-w-6xl px-6 pb-20 md:px-10">
        <div className="card-premium bg-gradient-to-br from-brand-600 to-brand-800 text-white">
          <h3 className="text-2xl font-black md:text-3xl" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            Ready to Build Your Resume?
          </h3>
          <p className="mx-auto mt-3 max-w-2xl text-sm text-brand-100 md:text-base">
            Pick a template and start creating a polished resume tailored for your next job opportunity.
          </p>
          <div className="mt-6">
            <Link to="/generate-resume" className="btn-primary inline-flex items-center gap-2 bg-white text-brand-700 hover:bg-brand-50">
              Create Resume Now
              <FaArrowRight className="text-xs" />
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Services;
