import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane, FaSave, FaPlusCircle } from "react-icons/fa";
import { BiBook } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import { generateResume, saveResume, deleteResume } from "../api/ResumeService";
import Resume from "../components/Resume";
import { useAuth } from "../context/AuthContext";
import { downloadResumePdf } from "../utils/resumePdf";

const emptyResume = {
  personalInformation: {
    fullName: "",
    email: "",
    phoneNumber: "",
    location: "",
    linkedin: "",
    gitHub: "",
    portfolio: "",
  },
  summary: "",
  skills: [],
  experience: [],
  education: [],
  certifications: [],
  projects: [],
  languages: [],
  interests: [],
};

const fieldCardClass = "rounded-2xl border border-slate-200 bg-white p-4";

const normalizeList = (items, fields) => {
  if (!Array.isArray(items)) return [];
  return items
    .map((item) => {
      if (typeof item === "string") {
        return { [fields[0]]: item };
      }
      if (item && typeof item === "object") {
        return fields.reduce((acc, key) => {
          acc[key] = item[key] || "";
          return acc;
        }, {});
      }
      return null;
    })
    .filter(Boolean);
};

const normalizeResumeData = (raw = {}) => {
  const personal = raw.personalInformation || {};
  return {
    ...emptyResume,
    ...raw,
    personalInformation: {
      ...emptyResume.personalInformation,
      ...personal,
      linkedIn: personal.linkedIn || personal.linkedin || "",
    },
    skills: normalizeList(raw.skills, ["title", "level"]),
    experience: normalizeList(raw.experience, ["jobTitle", "company", "location", "duration", "responsibility"]),
    education: normalizeList(raw.education, ["degree", "university", "location", "graduationYear"]),
    certifications: normalizeList(raw.certifications, ["title", "issuingOrganization", "year"]),
    projects: normalizeList(raw.projects, ["title", "description", "technologiesUsed", "githubLink"]),
    languages: normalizeList(raw.languages, ["name"]),
    interests: normalizeList(raw.interests, ["name"]),
  };
};

const toPdfPayload = (data = {}) => ({
  fullName: data.personalInformation?.fullName || "",
  email: data.personalInformation?.email || "",
  phone: data.personalInformation?.phoneNumber || "",
  location: data.personalInformation?.location || "",
  summary: data.summary || "",
  skill1: data.skills?.[0]?.title || "",
  skill2: data.skills?.[1]?.title || "",
  skill3: data.skills?.[2]?.title || "",
  skill4: data.skills?.[3]?.title || "",
  skill5: data.skills?.[4]?.title || "",
  skill6: data.skills?.[5]?.title || "",
  skill7: data.skills?.[6]?.title || "",
  skill8: data.skills?.[7]?.title || "",
  skill9: data.skills?.[8]?.title || "",
  skill10: data.skills?.[9]?.title || "",
  company1: data.experience?.[0]?.company || "",
  position1: data.experience?.[0]?.jobTitle || "",
  duration1: data.experience?.[0]?.duration || "",
  company2: data.experience?.[1]?.company || "",
  position2: data.experience?.[1]?.jobTitle || "",
  duration2: data.experience?.[1]?.duration || "",
  degree1: data.education?.[0]?.degree || "",
  university1: data.education?.[0]?.university || "",
  graduationYear1: data.education?.[0]?.graduationYear || "",
  project1: data.projects?.[0]?.title || "",
  project2: data.projects?.[1]?.title || "",
});

const GenerateResume = () => {
  const { selectedTemplate, user } = useAuth();
  const [resumeData, setResumeData] = useState(emptyResume);
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedResumeId, setSavedResumeId] = useState(null);
  const [step, setStep] = useState("prompt");

  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: emptyResume,
  });

  const skillsFields = useFieldArray({ control, name: "skills" });
  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({ control, name: "certifications" });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });

  const onSubmit = (formData) => {
    const normalized = normalizeResumeData(formData);
    setResumeData(normalized);
    setStep("preview");
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error("Please enter a description");
      return;
    }

    try {
      setLoading(true);
      const responseData = await generateResume(description.trim());
      const normalized = normalizeResumeData(responseData.data);
      reset(normalized);
      setResumeData(normalized);
      setStep("form");
      toast.success("Resume generated successfully");
    } catch (error) {
      toast.error("Failed to generate resume");
    } finally {
      setLoading(false);
    }
  };

  const handleSaveResume = async () => {
    try {
      if (!user?.email) {
        toast.error("Please login to save your resume.");
        return;
      }

      const payload = {
        userEmail: user.email,
        fullName: resumeData.personalInformation?.fullName || "",
        email: resumeData.personalInformation?.email || user.email,
        phone: resumeData.personalInformation?.phoneNumber || "",
        location: resumeData.personalInformation?.location || "",
        summary: resumeData.summary || "",
        skill1: resumeData.skills?.[0]?.title || "",
        skill2: resumeData.skills?.[1]?.title || "",
        skill3: resumeData.skills?.[2]?.title || "",
        skill4: resumeData.skills?.[3]?.title || "",
        skill5: resumeData.skills?.[4]?.title || "",
        skill6: resumeData.skills?.[5]?.title || "",
        skill7: resumeData.skills?.[6]?.title || "",
        skill8: resumeData.skills?.[7]?.title || "",
        skill9: resumeData.skills?.[8]?.title || "",
        skill10: resumeData.skills?.[9]?.title || "",
        company1: resumeData.experience?.[0]?.company || "",
        position1: resumeData.experience?.[0]?.jobTitle || "",
        duration1: resumeData.experience?.[0]?.duration || "",
        company2: resumeData.experience?.[1]?.company || "",
        position2: resumeData.experience?.[1]?.jobTitle || "",
        duration2: resumeData.experience?.[1]?.duration || "",
        degree1: resumeData.education?.[0]?.degree || "",
        university1: resumeData.education?.[0]?.university || "",
        graduationYear1: resumeData.education?.[0]?.graduationYear || "",
        project1: resumeData.projects?.[0]?.title || "",
        project2: resumeData.projects?.[1]?.title || "",
        jobDescription: description,
        coverLetter: "",
      };

      const saved = await saveResume(payload);
      const savedId = saved?.id || null;
      setSavedResumeId(savedId);

      const pdfPayload = toPdfPayload(resumeData);
      downloadResumePdf(pdfPayload, savedId ? String(savedId) : "resume");
      toast.success("Resume saved and downloaded");
    } catch (error) {
      toast.error("Failed to save resume");
    }
  };

  const handleDeleteResume = async () => {
    if (!savedResumeId) {
      toast.error("No saved resume to delete");
      return;
    }

    try {
      await deleteResume(savedResumeId);
      setSavedResumeId(null);
      toast.success("Resume deleted");
    } catch (error) {
      toast.error("Failed to delete resume");
    }
  };

  const renderInput = (name, label, type = "text") => (
    <div className="mb-3">
      <label className="mb-1 block text-sm font-semibold text-slate-700">{label}</label>
      <input type={type} {...register(name)} className="input-premium" />
    </div>
  );

  const renderFieldArray = (fields, label, name, keys) => (
    <section className={fieldCardClass}>
      <h3 className="text-lg font-bold text-slate-900">{label}</h3>
      <div className="mt-3 space-y-3">
        {fields.fields.map((field, index) => (
          <div key={field.id} className="rounded-xl border border-slate-200 bg-slate-50 p-3">
            {keys.map((key) => (
              <div key={key}>{renderInput(`${name}.${index}.${key}`, key)}</div>
            ))}
            <button type="button" onClick={() => fields.remove(index)} className="btn btn-sm border-0 bg-brand-600 text-white hover:bg-brand-700 mt-2">
              <FaTrash className="text-xs mr-1" /> Remove
            </button>
          </div>
        ))}
      </div>
      <button
        type="button"
        onClick={() => fields.append(keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {}))}
        className="btn mt-3 btn-sm border-0 bg-emerald-600 text-white hover:bg-emerald-700"
      >
        <FaPlusCircle className="text-xs mr-1" /> Add {label}
      </button>
    </section>
  );

  return (
    <main className="home-surface min-h-screen px-6 pb-20 pt-10 md:px-10">
      {selectedTemplate && (
        <div className="mx-auto mb-5 max-w-4xl rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
          Selected template: <span className="font-semibold">{selectedTemplate.name}</span> ({selectedTemplate.category})
        </div>
      )}

      {step === "prompt" && (
        <section className="mx-auto max-w-4xl card-premium text-center">
          <h1 className="text-3xl font-black md:text-4xl" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            <span className="inline-flex items-center gap-2"><FaBrain className="text-brand-600" /> AI Resume Draft</span>
          </h1>
          <p className="mx-auto mt-3 max-w-2xl text-slate-600">
            Describe your experience, skills, and target role. AI will create a structured resume draft.
          </p>
          <textarea
            disabled={loading}
            className="textarea-premium mt-5 h-56"
            placeholder="Example: I am a frontend developer with 3 years of React experience..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
          <div className="mt-4 flex flex-wrap justify-center gap-3">
            <button onClick={handleGenerate} disabled={loading} className="btn-primary flex items-center gap-2">
              {loading ? <span className="loading loading-spinner loading-sm"></span> : <FaPaperPlane className="text-xs" />} Generate Resume
            </button>
            <button onClick={() => setDescription("")} className="btn-secondary flex items-center gap-2">
              <FaTrash className="text-xs" /> Clear
            </button>
          </div>
        </section>
      )}

      {step === "form" && (
        <section className="mx-auto max-w-6xl card-premium">
          <h2 className="mb-5 text-3xl font-black" style={{ fontFamily: '"Space Grotesk", "Inter", sans-serif' }}>
            <span className="inline-flex items-center gap-2"><BiBook className="text-brand-600" /> Resume Editor</span>
          </h2>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <section className={fieldCardClass}>
              <h3 className="text-lg font-bold text-slate-900">Personal Information</h3>
              <div className="mt-3 grid gap-3 md:grid-cols-2">
                {renderInput("personalInformation.fullName", "Full Name")}
                {renderInput("personalInformation.email", "Email", "email")}
                {renderInput("personalInformation.phoneNumber", "Phone Number", "tel")}
                {renderInput("personalInformation.location", "Location")}
                {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
                {renderInput("personalInformation.gitHub", "GitHub", "url")}
                {renderInput("personalInformation.portfolio", "Portfolio", "url")}
              </div>
            </section>

            <section className={fieldCardClass}>
              <h3 className="text-lg font-bold text-slate-900">Summary</h3>
              <textarea {...register("summary")} className="textarea-premium mt-3 h-32"></textarea>
            </section>

            {renderFieldArray(skillsFields, "Skills", "skills", ["title", "level"])}
            {renderFieldArray(experienceFields, "Experience", "experience", ["jobTitle", "company", "location", "duration", "responsibility"])}
            {renderFieldArray(educationFields, "Education", "education", ["degree", "university", "location", "graduationYear"])}
            {renderFieldArray(certificationsFields, "Certifications", "certifications", ["title", "issuingOrganization", "year"])}
            {renderFieldArray(projectsFields, "Projects", "projects", ["title", "description", "technologiesUsed", "githubLink"])}
            {renderFieldArray(languagesFields, "Languages", "languages", ["name"])}
            {renderFieldArray(interestsFields, "Interests", "interests", ["name"])}

            <div className="flex flex-wrap justify-center gap-3">
              <button type="submit" className="btn-primary">Preview Resume</button>
              <button type="button" onClick={() => setStep("prompt")} className="btn-secondary">Back</button>
            </div>
          </form>
        </section>
      )}

      {step === "preview" && (
        <section className="mx-auto max-w-6xl">
          <Resume data={resumeData} template={selectedTemplate} />
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            <button onClick={() => setStep("prompt")} className="btn-primary">Generate Another</button>
            <button onClick={() => setStep("form")} className="btn-primary bg-emerald-600 hover:bg-emerald-700">Edit</button>
            <button onClick={handleSaveResume} className="btn-primary flex items-center gap-2"><FaSave className="text-xs" /> Save</button>
            <button onClick={handleDeleteResume} disabled={!savedResumeId} className="btn-secondary disabled:opacity-50"> <FaTrash className="text-xs mr-1" /> Delete</button>
          </div>
        </section>
      )}
    </main>
  );
};

export default GenerateResume;
