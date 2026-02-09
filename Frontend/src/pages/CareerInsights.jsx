import React, { useState } from "react";
import toast from "react-hot-toast";

function CareerInsights() {
  const [careerInfo, setCareerInfo] = useState({
    currentRole: "",
    experience: "",
    skills: "",
    interests: "",
    goals: ""
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
    { title: "AI/ML Engineer", salary: "$100K - $200K", growth: "Very High", description: "Build AI solutions" }
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

      // Match skills to career paths
      careerPaths.forEach(path => {
        const pathLower = path.title.toLowerCase();
        if (
          userSkills.includes("javascript") || userSkills.includes("react") || userSkills.includes("node") ||
          userSkills.includes("python") || userSkills.includes("java") ||
          pathLower.includes("developer") || pathLower.includes("engineer")
        ) {
          matchingPaths.push(path);
        }
      });

      // If no matches, add some default paths
      if (matchingPaths.length === 0) {
        matchingPaths.push(careerPaths[0], careerPaths[1], careerPaths[3]);
      }

      setInsights({
        recommendedPaths: matchingPaths.slice(0, 3),
        marketTrends: [
          { trend: "AI/ML Skills", impact: "High Demand", growth: "+40%" },
          { trend: "Cloud Computing", impact: "Essential", growth: "+35%" },
          { trend: "Cybersecurity", impact: "Critical", growth: "+30%" },
          { trend: "Remote Work", impact: "Standard", growth: "+25%" }
        ],
        tips: [
          "Learn at least one cloud platform (AWS, Azure, or GCP)",
          "Build a portfolio with real projects",
          "Network with professionals in your target field",
          "Consider certifications for your chosen path",
          "Stay updated with industry trends"
        ]
      });

      setAnalyzing(false);
      toast.success("Career insights generated!");
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Career Insights
          </h1>
          <p className="text-base-content/70">
            Get personalized career recommendations based on your skills
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {/* Input Form */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Your Information</h2>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Current Role</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Junior Developer"
                  className="input input-bordered w-full"
                  value={careerInfo.currentRole}
                  onChange={(e) => setCareerInfo({...careerInfo, currentRole: e.target.value})}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Years of Experience</span>
                </label>
                <select
                  className="select select-bordered w-full"
                  value={careerInfo.experience}
                  onChange={(e) => setCareerInfo({...careerInfo, experience: e.target.value})}
                >
                  <option value="">Select experience</option>
                  <option value="0-1">0-1 years</option>
                  <option value="1-3">1-3 years</option>
                  <option value="3-5">3-5 years</option>
                  <option value="5-10">5-10 years</option>
                  <option value="10+">10+ years</option>
                </select>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Skills</span>
                </label>
                <textarea
                  placeholder="e.g., JavaScript, React, Python, SQL, AWS"
                  className="textarea textarea-bordered w-full h-24"
                  value={careerInfo.skills}
                  onChange={(e) => setCareerInfo({...careerInfo, skills: e.target.value})}
                ></textarea>
              </div>

              <button
                onClick={getInsights}
                disabled={analyzing}
                className="btn btn-primary w-full"
              >
                {analyzing ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Analyzing...
                  </>
                ) : (
                  "Get Career Insights"
                )}
              </button>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Market Overview</h2>
              
              <div className="space-y-4">
                {[
                  { role: "Software Developer", demand: "Very High", avgSalary: "$85K" },
                  { role: "Data Scientist", demand: "Very High", avgSalary: "$95K" },
                  { role: "UX Designer", demand: "High", avgSalary: "$75K" },
                  { role: "Product Manager", demand: "High", avgSalary: "$110K" },
                  { role: "DevOps Engineer", demand: "High", avgSalary: "$90K" }
                ].map((item, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-base-100 rounded-lg">
                    <div>
                      <p className="font-semibold">{item.role}</p>
                      <p className="text-sm text-base-content/60">Demand: {item.demand}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{item.avgSalary}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Insights Results */}
        {insights && (
          <div className="max-w-5xl mx-auto">
            {/* Recommended Career Paths */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">
                Recommended Career Paths
              </h2>
              <div className="grid md:grid-cols-3 gap-4">
                {insights.recommendedPaths.map((path, index) => (
                  <div key={index} className="card bg-primary text-primary-content">
                    <div className="card-body">
                      <h3 className="card-title">{path.title}</h3>
                      <p className="text-sm opacity-90">{path.description}</p>
                      <div className="flex justify-between mt-2 text-sm">
                        <span>{path.salary}</span>
                        <span>{path.growth}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Market Trends */}
            <div className="mb-8">
              <h2 className="text-2xl font-bold text-base-content mb-4">
                Market Trends
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {insights.marketTrends.map((trend, index) => (
                  <div key={index} className="card bg-base-200 shadow">
                    <div className="card-body text-center">
                      <h3 className="font-bold">{trend.trend}</h3>
                      <p className="text-sm text-base-content/70">{trend.impact}</p>
                      <p className="text-lg font-bold text-success">{trend.growth}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tips */}
            <div>
              <h2 className="text-2xl font-bold text-base-content mb-4">
                Tips to Advance Your Career
              </h2>
              <div className="card bg-base-200 shadow-lg">
                <div className="card-body">
                  <ul className="space-y-2">
                    {insights.tips.map((tip, index) => (
                      <li key={index} className="flex items-center gap-2">
                        <span className="text-primary">✓</span>
                        {tip}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default CareerInsights;
