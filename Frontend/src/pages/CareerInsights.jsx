import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaArrowRight, FaChartLine, FaCheckCircle } from "react-icons/fa";

function CareerInsights() {
  const [careerInfo, setCareerInfo] = useState({
    currentRole: "",
    experience: "",
    skills: "",
    interests: "",
    goals: "",
  });
  const [insights, setInsights] = useState(null);
  const [analyzing, setAnalyzing] = useState(false);

  const careerPaths = [
    { title: "Full Stack Developer", salary: "$70K - $150K", growth: "High", description: "Build both frontend and backend applications" },
    { title: "Data Scientist", salary: "$80K - $160K", growth: "Very High", description: "Analyze data and build ML models" },
    { title: "DevOps Engineer", salary: "$75K - $140K", growth: "High", description: "Manage infrastructure and deployment" },
    { title: "Product Manager", salary: "$90K - $180K", growth: "High", description: "Lead product development" },
    { title: "UX Designer", salary: "$60K - $120K", growth: "Moderate", description: "Design user experiences" },
    { title: "Cloud Architect", salary: "$100K - $180K", growth: "Very High", description: "Design cloud solutions" },
    { title: "Security Engineer", salary: "$90K - $170K", growth: "Very High", description: "Protect systems and data" },
    { title: "AI/ML Engineer", salary: "$100K - $200K", growth: "Very High", description: "Build AI solutions" },
  ];

  const getInsights = () => {
    if (!careerInfo.currentRole && !careerInfo.skills) {
      toast.error("Please enter your current role or skills");
      return;
    }

    setAnalyzing(true);

    setTimeout(() => {
      const userSkills = careerInfo.skills.toLowerCase();
      const matchingPaths = [];

      careerPaths.forEach((path) => {
        const pathLower = path.title.toLowerCase();
        if (
          userSkills.includes("javascript") ||
          userSkills.includes("react") ||
          userSkills.includes("node") ||
          userSkills.includes("python") ||
          userSkills.includes("java") ||
          pathLower.includes("developer") ||
          pathLower.includes("engineer")
        ) {
          matchingPaths.push(path);
        }
      });

      if (matchingPaths.length === 0) {
        matchingPaths.push(careerPaths[0], careerPaths[1], careerPaths[3]);
      }

      setInsights({
        recommendedPaths: matchingPaths.slice(0, 3),
        marketTrends: [
          { trend: "AI/ML Skills", impact: "High Demand", growth: "+40%" },
          { trend: "Cloud Computing", impact: "Essential", growth: "+35%" },
          { trend: "Cybersecurity", impact: "Critical", growth: "+30%" },
          { trend: "Remote Work", impact: "Standard", growth: "+25%" },
        ],
        tips: [
          "Learn at least one cloud platform (AWS, Azure, or GCP)",
          "Build a portfolio with real projects",
          "Network with professionals in your target field",
          "Consider certifications for your chosen path",
          "Stay updated with industry trends",
        ],
      });

      setAnalyzing(false);
      toast.success("Career insights generated!");
    }, 1600);
  };

  return (
    <main className="home-surface min-h-screen">
      {/* Hero Section */}
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:px-10 md:pt-20">
        <div className="reveal-up glass-card rounded-3xl p-7 text-center md:p-10">
          <h1 className="text-4xl font-black md:text-5xl" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            Career Insights
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Analyze your profile and discover practical growth paths, demand trends, and action steps.
          </p>
        </div>
      </section>

      {/* Content Grid */}
      <section className="mx-auto grid max-w-7xl gap-6 px-6 pb-12 md:grid-cols-2 md:px-10">
        {/* Profile Form */}
        <article className="card-premium">
          <h2 className="text-2xl font-black text-slate-900" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            Your Profile
          </h2>
          <div className="mt-5 space-y-4">
            <input
              type="text"
              placeholder="Current Role"
              className="input-premium"
              value={careerInfo.currentRole}
              onChange={(e) => setCareerInfo({ ...careerInfo, currentRole: e.target.value })}
            />
            <select
              className="input-premium"
              value={careerInfo.experience}
              onChange={(e) => setCareerInfo({ ...careerInfo, experience: e.target.value })}
            >
              <option value="">Experience Level</option>
              <option value="0-1">0-1 years</option>
              <option value="1-3">1-3 years</option>
              <option value="3-5">3-5 years</option>
              <option value="5-10">5-10 years</option>
              <option value="10+">10+ years</option>
            </select>
            <textarea
              placeholder="Skills (comma separated)"
              className="textarea-premium h-24"
              value={careerInfo.skills}
              onChange={(e) => setCareerInfo({ ...careerInfo, skills: e.target.value })}
            ></textarea>
            <button onClick={getInsights} disabled={analyzing} className="btn-primary w-full flex items-center justify-center gap-2">
              {analyzing ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Analyzing
                </>
              ) : (
                <>
                  Get Insights <FaArrowRight className="text-xs" />
                </>
              )}
            </button>
          </div>
        </article>

        {/* Market Overview */}
        <article className="card-premium">
          <h2 className="flex items-center gap-2 text-2xl font-black text-slate-900" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            <FaChartLine className="text-brand-600" /> Market Overview
          </h2>
          <div className="mt-5 space-y-3">
            {[
              { role: "Software Developer", demand: "Very High", avgSalary: "$85K" },
              { role: "Data Scientist", demand: "Very High", avgSalary: "$95K" },
              { role: "UX Designer", demand: "High", avgSalary: "$75K" },
              { role: "Product Manager", demand: "High", avgSalary: "$110K" },
              { role: "DevOps Engineer", demand: "High", avgSalary: "$90K" },
            ].map((item) => (
              <div key={item.role} className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
                <p className="font-semibold text-slate-900">{item.role}</p>
                <p className="text-sm text-slate-600">Demand: {item.demand}</p>
                <p className="mt-1 text-sm font-bold text-emerald-700">Avg: {item.avgSalary}</p>
              </div>
            ))}
          </div>
        </article>
      </section>

      {/* Insights Results */}
      {insights && (
        <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
          <div className="space-y-8">
            {/* Recommended Paths */}
            <div>
              <h3 className="text-center text-2xl font-black text-slate-900" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
                Recommended Paths
              </h3>
              <div className="mt-4 grid gap-4 md:grid-cols-3">
                {insights.recommendedPaths.map((path) => (
                  <div key={path.title} className="card-premium card-premium-interactive">
                    <p className="text-lg font-bold text-slate-900">{path.title}</p>
                    <p className="mt-2 text-sm text-slate-600">{path.description}</p>
                    <div className="mt-3 flex items-center justify-between text-sm">
                      <span className="font-semibold text-brand-600">{path.salary}</span>
                      <span className="badge-premium badge-brand">{path.growth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Action Tips */}
            <div className="card-premium">
              <h3 className="text-center text-2xl font-black text-slate-900" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
                Action Tips
              </h3>
              <ul className="mt-4 space-y-2">
                {insights.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-slate-700">
                    <FaCheckCircle className="mt-0.5 text-emerald-600 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default CareerInsights;
