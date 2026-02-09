import React, { useState } from "react";
import toast from "react-hot-toast";

function CoverLetter() {
  const [jobDetails, setJobDetails] = useState({
    companyName: "",
    jobTitle: "",
    hiringManager: "",
    jobDescription: "",
    yourSkills: ""
  });
  const [coverLetter, setCoverLetter] = useState("");
  const [generating, setGenerating] = useState(false);

  const generateCoverLetter = () => {
    if (!jobDetails.companyName || !jobDetails.jobTitle || !jobDetails.jobDescription) {
      toast.error("Please fill in company name, job title, and job description");
      return;
    }

    setGenerating(true);

    // Simulate AI generation
    setTimeout(() => {
      const letter = `
Dear ${jobDetails.hiringManager || "Hiring Manager"},

I am writing to express my strong interest in the ${jobDetails.jobTitle} position at ${jobDetails.companyName}. With my background and skills, I am confident that I would be a valuable addition to your team.

${jobDetails.yourSkills ? `My key skills include: ${jobDetails.yourSkills}.` : ""}

I am particularly drawn to ${jobDetails.companyName} because of its reputation for innovation and excellence in the industry. I am eager to contribute my expertise and grow with your organization.

I would welcome the opportunity to discuss how my skills and experience align with your team's needs. Thank you for considering my application.

Sincerely,
[Your Name]
      `.trim();

      setCoverLetter(letter);
      setGenerating(false);
      toast.success("Cover letter generated!");
    }, 2000);
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(coverLetter);
    toast.success("Copied to clipboard!");
  };

  return (
    <div className="min-h-screen bg-base-100 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-base-content mb-2">
            Cover Letter Generator
          </h1>
          <p className="text-base-content/70">
            Create professional cover letters in minutes
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Input Form */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <h2 className="card-title mb-4">Job Details</h2>
              
              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Company Name</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Google, Microsoft"
                  className="input input-bordered w-full"
                  value={jobDetails.companyName}
                  onChange={(e) => setJobDetails({...jobDetails, companyName: e.target.value})}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Job Title</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Software Engineer"
                  className="input input-bordered w-full"
                  value={jobDetails.jobTitle}
                  onChange={(e) => setJobDetails({...jobDetails, jobTitle: e.target.value})}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Hiring Manager (Optional)</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g., Your name"
                  className="input input-bordered w-full"
                  value={jobDetails.hiringManager}
                  onChange={(e) => setJobDetails({...jobDetails, hiringManager: e.target.value})}
                />
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Your Key Skills</span>
                </label>
                <textarea
                  placeholder="e.g., JavaScript, React, Node.js, Team Leadership"
                  className="textarea textarea-bordered w-full h-20"
                  value={jobDetails.yourSkills}
                  onChange={(e) => setJobDetails({...jobDetails, yourSkills: e.target.value})}
                ></textarea>
              </div>

              <div className="form-control mb-4">
                <label className="label">
                  <span className="label-text">Job Description</span>
                </label>
                <textarea
                  placeholder="Paste the job description here..."
                  className="textarea textarea-bordered w-full h-32"
                  value={jobDetails.jobDescription}
                  onChange={(e) => setJobDetails({...jobDetails, jobDescription: e.target.value})}
                ></textarea>
              </div>

              <button
                onClick={generateCoverLetter}
                disabled={generating}
                className="btn btn-primary w-full"
              >
                {generating ? (
                  <>
                    <span className="loading loading-spinner loading-sm"></span>
                    Generating...
                  </>
                ) : (
                  "Generate Cover Letter"
                )}
              </button>
            </div>
          </div>

          {/* Output */}
          <div className="card bg-base-200 shadow-lg">
            <div className="card-body">
              <div className="flex justify-between items-center mb-4">
                <h2 className="card-title">Your Cover Letter</h2>
                {coverLetter && (
                  <button onClick={copyToClipboard} className="btn btn-ghost btn-sm">
                    Copy
                  </button>
                )}
              </div>

              {coverLetter ? (
                <div className="bg-base-100 p-4 rounded-lg whitespace-pre-wrap text-sm leading-relaxed">
                  {coverLetter}
                </div>
              ) : (
                <div className="bg-base-100 p-8 rounded-lg text-center text-base-content/50">
                  <p>Fill in the details and click generate</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CoverLetter;
