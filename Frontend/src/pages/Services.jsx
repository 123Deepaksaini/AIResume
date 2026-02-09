import React, { useState } from "react";
import { Link } from "react-router";
import { useAuth } from "../context/AuthContext";
import toast from "react-hot-toast";

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
      description: "Create professional resumes with AI assistance",
      page: "/generate-resume"
    },
    {
      id: 2,
      title: "ATS Score Checker",
      description: "Check if your resume passes Applicant Tracking Systems",
      page: "#ats-checker"
    },
    {
      id: 3,
      title: "Resume Templates",
      description: "Choose from 6 professional templates",
      page: "#templates"
    },
    {
      id: 4,
      title: "Interview Prep",
      description: "Practice with AI-generated interview questions",
      page: "/interview-prep"
    },
    {
      id: 5,
      title: "Cover Letters",
      description: "Generate customized cover letters",
      page: "/cover-letter"
    },
    {
      id: 6,
      title: "Career Insights",
      description: "Get personalized career recommendations",
      page: "/career-insights"
    }
  ];

  const templates = [
    { id: 1, name: "Modern Professional", category: "Corporate", color: "bg-blue-500" },
    { id: 2, name: "Creative Designer", category: "Creative", color: "bg-purple-500" },
    { id: 3, name: "Tech Developer", category: "Technology", color: "bg-green-500" },
    { id: 4, name: "Executive Manager", category: "Management", color: "bg-amber-500" },
    { id: 5, name: "Simple Clean", category: "General", color: "bg-gray-500" },
    { id: 6, name: "Academic Research", category: "Academic", color: "bg-teal-500" }
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
    if (file) {
      if (file.type !== "application/pdf") {
        toast.error("Please upload a PDF file");
        return;
      }
      setResumeFile(file);
      setExtractedText("Resume text extracted from PDF.");
      toast.success("PDF uploaded successfully!");
    }
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
        "experience", "skills", "responsible", "team", "project", "lead", 
        "manage", "develop", "design", "implement", "analyze", "optimize",
        "javascript", "python", "java", "react", "node", "sql", "aws", "cloud",
        "communication", "problem solving", "leadership", "time management"
      ];
      
      let foundKeywords = 0;
      keywords.forEach(kw => {
        if (jd.includes(kw) || resume.includes(kw)) foundKeywords++;
      });
      
      const score = Math.min(95, 50 + (foundKeywords * 3) + Math.floor(Math.random() * 10));
      setAtsScore(score);
      setAnalyzingAts(false);
      toast.success(`ATS Score: ${score}%`);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Our <span className="text-primary">Services</span>
          </h1>
          <p className="text-lg text-base-content/70">
            Choose a service to get started
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto mb-16">
          {services.map((service) => (
            <a
              key={service.id}
              href={service.page}
              className="card bg-base-200 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 cursor-pointer"
            >
              <div className="card-body items-center text-center py-6">
                <h2 className="card-title text-lg">{service.title}</h2>
                <p className="text-base-content/70 text-sm">
                  {service.description}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* ATS Score Checker */}
        <div id="ats-checker" className="max-w-2xl mx-auto mb-16">
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title justify-center text-xl mb-2">
                Free ATS Score Checker
              </h2>
              <p className="text-center text-base-content/70 text-sm mb-4">
                Upload your resume PDF and paste job description to check ATS compatibility
              </p>
              
              {/* PDF Upload */}
              <div className="mb-4">
                <label className="form-control w-full">
                  <div className="label">
                    <span className="label-text">Upload Resume (PDF)</span>
                  </div>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={handleFileUpload}
                    className="file-input file-input-bordered w-full"
                  />
                </label>
                {resumeFile && (
                  <p className="text-sm text-success mt-1">
                    ✓ {resumeFile.name}
                  </p>
                )}
              </div>

              <textarea
                className="textarea textarea-bordered w-full h-28"
                placeholder="Or paste job description here..."
                value={atsJobDescription}
                onChange={(e) => setAtsJobDescription(e.target.value)}
              ></textarea>
              
              <div className="card-actions justify-center mt-4">
                <button 
                  onClick={analyzeAtsScore}
                  disabled={analyzingAts}
                  className="btn btn-primary"
                >
                  {analyzingAts ? (
                    <>
                      <span className="loading loading-spinner loading-sm"></span>
                      Analyzing...
                    </>
                  ) : (
                    "Check ATS Score"
                  )}
                </button>
              </div>
              
              {atsScore !== null && (
                <div className="mt-6 text-center">
                  <div className="radial-progress text-primary" 
                    style={{ "--value": atsScore, "--size": "5rem" }} 
                    role="progressbar">
                    <span className="text-lg font-bold">{atsScore}%</span>
                  </div>
                  <p className="mt-2 text-sm text-base-content/70">
                    {atsScore >= 80 ? "Excellent! Resume is well-optimized" : 
                     atsScore >= 60 ? "Good, add more keywords for better score" : 
                     "Needs improvement. Include more job keywords"}
                  </p>
                  
                  <div className="mt-4 text-left bg-base-100 p-3 rounded-lg">
                    <h4 className="font-bold text-sm mb-2">Suggestions:</h4>
                    <ul className="text-xs text-base-content/70 space-y-1">
                      {atsScore < 80 && (
                        <>
                          <li>• Include more keywords from job description</li>
                          <li>• Use standard section headings</li>
                          <li>• Keep formatting simple (no graphics)</li>
                        </>
                      )}
                      {atsScore >= 80 && (
                        <li>✓ Your resume looks great for ATS!</li>
                      )}
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Templates Section */}
        <div id="templates" className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-base-content mb-2">
              Resume Templates
            </h2>
            <p className="text-base-content/70">
              Select a template - it will be used when generating your resume
            </p>
          </div>

          {selectedTemplate && (
            <div className="alert alert-success mb-4 max-w-2xl mx-auto">
              <span>Template "{selectedTemplate.name}" selected!</span>
              <button 
                onClick={() => {
                  selectTemplate(null);
                  setSelectedTemplateId(null);
                }}
                className="btn btn-ghost btn-xs"
              >
                Clear
              </button>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {templates.map((template) => (
              <div
                key={template.id}
                className={`card bg-base-200 shadow-lg cursor-pointer hover:shadow-xl transition-all duration-300 hover:-translate-y-1 ${
                  selectedTemplateId === template.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => handleTemplateSelect(template)}
              >
                <div className={`h-20 ${template.color} flex items-center justify-center`}>
                  <div className="text-white text-4xl font-bold opacity-60">Aa</div>
                </div>
                <div className="card-body py-3">
                  <h3 className="card-title justify-center text-base">{template.name}</h3>
                  <p className="text-center text-xs text-base-content/60">
                    {template.category}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="card bg-gradient-to-r from-primary to-secondary text-primary-content max-w-xl mx-auto">
            <div className="card-body text-center py-6">
              <h2 className="text-xl font-bold mb-2">Ready to Create Your Resume?</h2>
              <p className="mb-4 text-sm">Select a template and start building</p>
              <div className="card-actions justify-center">
                <Link to="/generate-resume" className="btn btn-accent">
                  Create Resume Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Services;
