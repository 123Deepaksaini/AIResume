import React from "react";

function Home() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-base-content mb-6">
            AI Resume Generator
          </h1>
          <p className="text-xl text-base-content/70 mb-8 max-w-2xl mx-auto">
            Create professional resumes instantly with the power of AI. Just describe your experience and skills, and let our AI do the rest.
          </p>
          <div className="flex gap-4 justify-center">
            <a href="/generate-resume" className="btn btn-primary btn-lg">
              Generate Resume
            </a>
            <a href="/about" className="btn btn-outline btn-lg">
              Learn More
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
