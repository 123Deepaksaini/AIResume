import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaQuestionCircle, FaLightbulb, FaChevronDown, FaChevronUp } from "react-icons/fa";

const InterviewPrep = () => {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());

  useEffect(() => {
    fetchInterviewQuestions();
  }, []);

  const fetchInterviewQuestions = async () => {
    try {
      const response = await axios.get("http://localhost:9090/api/v1/interview/questions");
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching interview questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (index) => {
    const newExpanded = new Set(expandedQuestions);
    if (newExpanded.has(index)) {
      newExpanded.delete(index);
    } else {
      newExpanded.add(index);
    }
    setExpandedQuestions(newExpanded);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-base-200 flex items-center justify-center">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary"></span>
          <p className="mt-4 text-lg">Loading interview questions...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-base-content mb-4">
            Interview Preparation
          </h1>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto">
            Master common interview questions with detailed answers and tips.
            Practice these questions to boost your confidence and performance.
          </p>
        </div>

        {/* Questions List */}
        <div className="space-y-4">
          {questions.map((qa, index) => (
            <div
              key={index}
              className="bg-base-100 rounded-lg shadow-lg overflow-hidden"
            >
              {/* Question Header */}
              <div
                className="p-6 cursor-pointer hover:bg-base-200 transition-colors"
                onClick={() => toggleQuestion(index)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <FaQuestionCircle className="text-primary text-xl" />
                    <h3 className="text-lg font-semibold text-base-content">
                      {qa.question}
                    </h3>
                  </div>
                  <div className="text-primary">
                    {expandedQuestions.has(index) ? (
                      <FaChevronUp className="text-xl" />
                    ) : (
                      <FaChevronDown className="text-xl" />
                    )}
                  </div>
                </div>
              </div>

              {/* Answer Section */}
              {expandedQuestions.has(index) && (
                <div className="px-6 pb-6 border-t border-base-300">
                  <div className="pt-4">
                    <div className="flex items-start gap-3">
                      <FaLightbulb className="text-success text-lg mt-1" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-base-content mb-2">
                          Suggested Answer:
                        </h4>
                        <p className="text-base-content/80 leading-relaxed">
                          {qa.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Tips Section */}
        <div className="mt-12 bg-base-100 rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-bold text-base-content mb-6 text-center">
            Interview Tips
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">Preparation Tips</h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Research the company thoroughly</li>
                <li>• Practice answers out loud</li>
                <li>• Prepare questions for the interviewer</li>
                <li>• Review your resume before the interview</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-primary">During Interview</h3>
              <ul className="space-y-2 text-base-content/80">
                <li>• Listen carefully to questions</li>
                <li>• Take time to think before answering</li>
                <li>• Be honest and authentic</li>
                <li>• Show enthusiasm for the role</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 text-center">
          <div className="stats stats-vertical lg:stats-horizontal shadow">
            <div className="stat">
              <div className="stat-figure text-primary">
                <div className="text-3xl"></div>
              </div>
              <div className="stat-title">Total Questions</div>
              <div className="stat-value text-primary">{questions.length}</div>
            </div>
            <div className="stat">
              <div className="stat-figure text-success">
                <div className="text-3xl"></div>
              </div>
              <div className="stat-title">Detailed Answers</div>
              <div className="stat-value text-success">{questions.length}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InterviewPrep;