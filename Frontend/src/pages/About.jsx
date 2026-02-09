import React from 'react'

function About() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-base-content mb-8">
            About AI Resume Generator
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-primary">What We Do</h2>
                <p className="text-base-content/70">
                  Our AI-powered resume generator helps you create professional resumes instantly.
                  Simply describe your experience, skills, and background, and our advanced AI will
                  craft a compelling resume tailored to your needs.
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-primary">How It Works</h2>
                <p className="text-base-content/70">
                  1. Enter your professional description<br/>
                  2. AI analyzes and structures your information<br/>
                  3. Customize the generated resume<br/>
                  4. Download your professional resume
                </p>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-primary">Features</h2>
                <ul className="text-base-content/70 space-y-2">
                  <li>• AI-powered content generation</li>
                  <li>• Professional resume templates</li>
                  <li>• Customizable sections</li>
                  <li>• Multiple format support</li>
                  <li>• Instant preview</li>
                </ul>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-primary">Benefits</h2>
                <ul className="text-base-content/70 space-y-2">
                  <li>• Save time and effort</li>
                  <li>• Professional quality results</li>
                  <li>• ATS-friendly formats</li>
                  <li>• Easy to customize</li>
                  <li>• Free to use</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <a href="/generate-resume" className="btn btn-primary btn-lg">
              Try It Now
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About