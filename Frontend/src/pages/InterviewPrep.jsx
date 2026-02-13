import React, { useMemo, useState } from "react";
import toast from "react-hot-toast";
import {
  FaArrowRight,
  FaChevronDown,
  FaChevronUp,
  FaCode,
  FaComments,
  FaLightbulb,
} from "react-icons/fa";
import { generateInterviewQuestionsBySkills } from "../api/ResumeService";

const skillOptions = [
  "JavaScript",
  "React",
  "Node.js",
  "Java",
  "Spring Boot",
  "Python",
  "SQL",
  "System Design",
  "Data Structures",
  "AWS",
  "Docker",
  "Communication",
  "Leadership",
  "Problem Solving",
];

function InterviewPrep() {
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [questions, setQuestions] = useState([]);
  const [expandedQuestions, setExpandedQuestions] = useState(new Set());
  const [loading, setLoading] = useState(false);

  const groupedStats = useMemo(() => {
    const technical = questions.filter((q) => (q.category || "").toLowerCase().includes("technical")).length;
    const behavioral = questions.filter((q) => (q.category || "").toLowerCase().includes("behavioral")).length;
    return { technical, behavioral };
  }, [questions]);

  const toggleSkill = (skill) => {
    if (selectedSkills.includes(skill)) {
      setSelectedSkills(selectedSkills.filter((s) => s !== skill));
      return;
    }
    setSelectedSkills([...selectedSkills, skill]);
  };

  const clearSkills = () => {
    setSelectedSkills([]);
    setQuestions([]);
    setExpandedQuestions(new Set());
  };

  const handleGenerateQuestions = async () => {
    if (selectedSkills.length === 0) {
      toast.error("Please select at least one skill");
      return;
    }

    setLoading(true);
    try {
      const response = await generateInterviewQuestionsBySkills(selectedSkills);
      const list = Array.isArray(response?.questions) ? response.questions : [];

      if (list.length === 0) {
        toast.error("No questions generated. Try different skills.");
      } else {
        setQuestions(list);
        setExpandedQuestions(new Set());
        toast.success("Interview questions generated!");
      }
    } catch (error) {
      console.error("Error fetching interview questions:", error);
      toast.error("Failed to generate questions");
    } finally {
      setLoading(false);
    }
  };

  const toggleQuestion = (index) => {
    const next = new Set(expandedQuestions);
    if (next.has(index)) next.delete(index);
    else next.add(index);
    setExpandedQuestions(next);
  };

  return (
    <main className="home-surface min-h-screen text-slate-900">
      <section className="mx-auto max-w-7xl px-6 pb-12 pt-14 md:px-10 md:pt-20">
        <div className="reveal-up rounded-3xl border border-slate-200/70 bg-white/90 p-7 text-center shadow-xl backdrop-blur md:p-10">
          <h1
            className="text-4xl font-black leading-tight md:text-5xl"
            style={{ fontFamily: '"Space Grotesk", "Segoe UI", sans-serif' }}
          >
            Skill-Based Interview Preparation
          </h1>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-7 text-slate-600 md:text-lg">
            Select your skills and generate role-relevant interview questions and model answers using Groq.
          </p>

          <div className="mt-7 flex flex-wrap justify-center gap-2">
            {skillOptions.map((skill) => {
              const active = selectedSkills.includes(skill);
              return (
                <button
                  key={skill}
                  onClick={() => toggleSkill(skill)}
                  className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                    active
                      ? "border-sky-600 bg-sky-600 text-white"
                      : "border-slate-300 bg-white text-slate-700 hover:border-sky-500"
                  }`}
                >
                  {skill}
                </button>
              );
            })}
          </div>

          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleGenerateQuestions}
              disabled={loading}
              className="btn border-0 bg-sky-600 text-white hover:bg-sky-700"
            >
              {loading ? (
                <>
                  <span className="loading loading-spinner loading-sm"></span>
                  Generating
                </>
              ) : (
                <>
                  Generate Questions
                  <FaArrowRight className="ml-1 text-xs" />
                </>
              )}
            </button>
            <button onClick={clearSkills} className="btn btn-outline border-slate-300 text-slate-700">
              Reset
            </button>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-10 md:px-10">
        <div className="grid gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Selected Skills</p>
            <p className="mt-2 text-2xl font-black text-slate-900">{selectedSkills.length}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Technical Qs</p>
            <p className="mt-2 text-2xl font-black text-sky-700">{groupedStats.technical}</p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">Behavioral Qs</p>
            <p className="mt-2 text-2xl font-black text-pink-700">{groupedStats.behavioral}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-20 md:px-10">
        <div className="space-y-4">
          {questions.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center text-slate-500">
              Select skills and click <span className="font-semibold text-slate-700">Generate Questions</span>.
            </div>
          ) : (
            questions.map((qa, index) => {
              const isOpen = expandedQuestions.has(index);
              const category = (qa.category || "technical").toLowerCase();
              const badgeClass = category.includes("behavioral")
                ? "bg-pink-100 text-pink-700"
                : category.includes("problem")
                ? "bg-emerald-100 text-emerald-700"
                : "bg-sky-100 text-sky-700";

              return (
                <article key={`${qa.question}-${index}`} className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
                  <button
                    className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
                    onClick={() => toggleQuestion(index)}
                  >
                    <div>
                      <span className={`mb-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}>
                        {qa.category || "technical"}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 md:text-lg">{qa.question}</h3>
                    </div>
                    {isOpen ? (
                      <FaChevronUp className="shrink-0 text-slate-600" />
                    ) : (
                      <FaChevronDown className="shrink-0 text-slate-600" />
                    )}
                  </button>

                  {isOpen && (
                    <div className="border-t border-slate-100 bg-slate-50 px-6 py-5">
                      <div className="flex items-start gap-3">
                        {category.includes("behavioral") ? (
                          <FaComments className="mt-1 text-pink-600" />
                        ) : category.includes("problem") ? (
                          <FaLightbulb className="mt-1 text-emerald-600" />
                        ) : (
                          <FaCode className="mt-1 text-sky-600" />
                        )}
                        <p className="text-sm leading-7 text-slate-700">{qa.answer}</p>
                      </div>
                    </div>
                  )}
                </article>
              );
            })
          )}
        </div>
      </section>
    </main>
  );
}

export default InterviewPrep;
