import React from "react";

function Contact() {
  return (
    <div className="min-h-screen bg-base-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-base-content mb-8">
            Contact Us
          </h1>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-primary">Get In Touch</h2>
                <p className="text-base-content/70 mb-4">
                  Have questions about our AI Resume Generator? We'd love to hear from you!
                </p>

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold">Email</div>
                      <div className="text-base-content/70">support@airesumegenerator.com</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold">Support</div>
                      <div className="text-base-content/70">24/7 AI Support Available</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div>
                      <div className="font-semibold">Website</div>
                      <div className="text-base-content/70">www.airesumegenerator.com</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="card bg-base-200 shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-primary">Quick Links</h2>

                <div className="space-y-3">
                  <a href="/" className="btn btn-ghost btn-sm justify-start w-full">
                    Home
                  </a>
                  <a href="/about" className="btn btn-ghost btn-sm justify-start w-full">
                    About
                  </a>
                  <a href="/services" className="btn btn-ghost btn-sm justify-start w-full">
                    Services
                  </a>
                  <a href="/generate-resume" className="btn btn-primary btn-sm justify-start w-full">
                    Generate Resume
                  </a>
                </div>

                <div className="divider"></div>

                <div className="text-center">
                  <p className="text-base-content/70 text-sm">
                    Ready to create your professional resume?
                  </p>
                  <a href="/generate-resume" className="btn btn-primary btn-sm mt-2">
                    Start Now
                  </a>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <div className="card bg-base-200 shadow-lg inline-block">
              <div className="card-body text-center">
                <h3 className="text-xl font-bold text-primary mb-2">AI Resume Generator</h3>
                <p className="text-base-content/70">
                  Powered by advanced AI technology to help you create professional resumes instantly.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;
