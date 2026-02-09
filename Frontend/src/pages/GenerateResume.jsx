import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaBrain, FaTrash, FaPaperPlane, FaSave } from "react-icons/fa";
import { generateResume, saveResume, deleteResume } from "../api/ResumeService";
import { BiBook } from "react-icons/bi";
import { useForm, useFieldArray } from "react-hook-form";
import { FaPlusCircle } from "react-icons/fa";
import Resume from "../components/Resume";
import { useAuth } from "../context/AuthContext";

const GenerateResume = () => {
  const { selectedTemplate, user } = useAuth();
  const [data, setData] = useState({
    personalInformation: {
      fullName: "Deepak Saini",
    },
    summary: "",
    skills: [],
    experience: [],
    education: [],
    certifications: [],
    projects: [],
    languages: [],
    interests: [],
  });

  const { register, handleSubmit, control, setValue, reset } = useForm({
    defaultValues: data,
  });

  const [showFormUI, setShowFormUI] = useState(false);
  const [showResumeUI, setShowResumeUI] = useState(false);
  const [showPromptInput, setShowPromptInput] = useState(true);

  const experienceFields = useFieldArray({ control, name: "experience" });
  const educationFields = useFieldArray({ control, name: "education" });
  const certificationsFields = useFieldArray({
    control,
    name: "certifications",
  });
  const projectsFields = useFieldArray({ control, name: "projects" });
  const languagesFields = useFieldArray({ control, name: "languages" });
  const interestsFields = useFieldArray({ control, name: "interests" });
  const skillsFields = useFieldArray({ control, name: "skills" });

  //handle form submit
  const onSubmit = (formData) => {
    console.log("Form Data:", formData);
    setData({ ...formData });

    setShowFormUI(false);
    setShowPromptInput(false);
    setShowResumeUI(true);
  };

  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [savedResumeId, setSavedResumeId] = useState(null);

  const handleGenerating = async () => {
    console.log(description);
    // server call to get resume

    try {
      setLoading(true);
      const responseData = await generateResume(description);
      console.log(responseData);
      reset(responseData.data);

      toast.success("Resume Generated Successfully!", {
        duration: 3000,
        position: "top-center",
      });
      setShowFormUI(true);
      setShowPromptInput(false);
      setShowResumeUI(false);
    } catch (error) {
      console.log(error);
      toast.error("Error Generating Resume!");
    } finally {
      setLoading(false);
      setDescription("");
    }
  };

  const handleClear = () => {
    setDescription("");
  };

  const renderInput = (name, label, type = "text") => (
    <div className="form-control w-full  mb-4">
      <label className="label">
        <span className="label-text text-base-content">{label}</span>
      </label>
      <input
        type={type}
        {...register(name)}
        className="input input-bordered rounded-xl w-full bg-base-100 text-base-content"
      />
    </div>
  );
  const renderFieldArray = (fields, label, name, keys) => {
    return (
      <div className="form-control w-full mb-4">
        <h3 className="text-xl font-semibold">{label}</h3>
        {fields.fields.map((field, index) => (
          <div key={field.id} className="p-4 rounded-lg mb-4 bg-base-100">
            {keys.map((key) => (
              <div key={key}>
                {console.log(`${name}`)}
                {renderInput(`${name}.${index}.${key}`, key)}
              </div>
            ))}
            <button
              type="button"
              onClick={() => fields.remove(index)}
              className="btn btn-error btn-sm mt-2"
            >
              <FaTrash className="w-5 h-5 text-base-content" /> Remove {label}
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() =>
            fields.append(
              keys.reduce((acc, key) => ({ ...acc, [key]: "" }), {})
            )
          }
          className="btn btn-secondary btn-sm mt-2 flex items-center"
        >
          <FaPlusCircle className="w-5 h-5 mr-1 text-base-content" /> Add{" "}
          {label}
        </button>
      </div>
    );
  };

  function showFormFunction() {
    return (
      <div className="w-full p-10">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          <BiBook className="text-accent" /> Resume Form
        </h1>
        <div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-6 space-y-6 bg-base-200 rounded-lg text-base-content"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {renderInput("personalInformation.fullName", "Full Name")}
              {renderInput("personalInformation.email", "Email", "email")}
              {renderInput(
                "personalInformation.phoneNumber",
                "Phone Number",
                "tel"
              )}
              {renderInput("personalInformation.location", "Location")}
              {renderInput("personalInformation.linkedin", "LinkedIn", "url")}
              {renderInput("personalInformation.gitHub", "GitHub", "url")}
              {renderInput("personalInformation.portfolio", "Portfolio", "url")}
            </div>

            <h3 className="text-xl font-semibold">Summary</h3>
            <textarea
              {...register("summary")}
              className="textarea textarea-bordered w-full bg-base-100 text-base-content"
              rows={4}
            ></textarea>

            {renderFieldArray(skillsFields, "Skills", "skills", [
              "title",
              "level",
            ])}
            {renderFieldArray(experienceFields, "Experience", "experience", [
              "jobTitle",
              "company",
              "location",
              "duration",
              "responsibility",
            ])}
            {renderFieldArray(educationFields, "Education", "education", [
              "degree",
              "university",
              "location",
              "graduationYear",
            ])}
            {renderFieldArray(
              certificationsFields,
              "Certifications",
              "certifications",
              ["title", "issuingOrganization", "year"]
            )}
            {renderFieldArray(projectsFields, "Projects", "projects", [
              "title",
              "description",
              "technologiesUsed",
              "githubLink",
            ])}

            <div className="flex gap-3 mt-16  p-4 rounded-xl ">
              <div className="flex-1">
                {renderFieldArray(languagesFields, "Languages", "languages", [
                  "name",
                ])}
              </div>
              <div className="flex-1">
                {renderFieldArray(interestsFields, "Interests", "interests", [
                  "name",
                ])}
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full">
              Submit
            </button>
          </form>
        </div>
      </div>
    );
  }

  function ShowInputField() {
    return (
      <div className="bg-base-200 shadow-lg rounded-lg p-10 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold mb-6 flex items-center justify-center gap-2">
          <FaBrain className="text-accent" /> AI Resume Description Input
        </h1>
        <p className="mb-4 text-lg text-gray-600">
          Enter a detailed description about yourself to generate your
          professional resume.
        </p>
        <textarea
          disabled={loading}
          className="textarea textarea-bordered w-full h-48 mb-6 resize-none"
          placeholder="Type your description here..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-center gap-4">
          <button
            disabled={loading}
            onClick={handleGenerating}
            className="btn btn-primary flex items-center gap-2"
          >
            {loading && <span className="loading loading-spinner"></span>}
            <FaPaperPlane />
            Generate Resume
          </button>
          <button
            onClick={handleClear}
            className="btn btn-secondary flex items-center gap-2"
          >
            <FaTrash /> Clear
          </button>
        </div>
      </div>
    );
  }
  function showResume() {
    return (
      <div>
        <Resume data={data} template={selectedTemplate} />

        <div className="flex mt-5 justify-center gap-2">
          <div
            onClick={() => {
              setShowPromptInput(true);
              setShowFormUI(false);
              setShowResumeUI(false);
            }}
            className="btn btn-accent"
          >
            Generate Another
          </div>
          <div
            onClick={() => {
              setShowPromptInput(false);
              setShowFormUI(true);
              setShowResumeUI(false);
            }}
            className="btn btn-success"
          >
            Edit
          </div>
          <div
            onClick={async () => {
              try {
                const formatArray = (arr) => arr.map(item => Object.values(item).join(" | ")).join("\n");
                
                // Use logged-in user's email or fallback to form email
                const userEmail = user?.email || data.personalInformation?.email || "anonymous@example.com";
                
                const resumeData = {
                  userEmail: userEmail,
                  fullName: data.personalInformation?.fullName || "",
                  email: userEmail,
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
                  position1: data.experience?.[0]?.jobTitle || data.experience?.[0]?.position || "",
                  duration1: data.experience?.[0]?.duration || "",
                  company2: data.experience?.[1]?.company || "",
                  position2: data.experience?.[1]?.jobTitle || data.experience?.[1]?.position || "",
                  duration2: data.experience?.[1]?.duration || "",
                  degree1: data.education?.[0]?.degree || "",
                  university1: data.education?.[0]?.university || data.education?.[0]?.institution || "",
                  graduationYear1: data.education?.[0]?.graduationYear || "",
                  project1: data.projects?.[0]?.title || "",
                  project2: data.projects?.[1]?.title || "",
                  jobDescription: description,
                  coverLetter: "",
                };
                const savedResume = await saveResume(resumeData);
                setSavedResumeId(savedResume?.id);
                toast.success("Resume Saved to Database!");
              } catch (error) {
                console.error("Error saving resume:", error);
                toast.error("Error Saving Resume!");
              }
            }}
            className="btn btn-primary"
          >
            <FaSave className="mr-1" /> Save to Database
          </div>
          <div
            onClick={async () => {
              try {
                if (savedResumeId) {
                  await deleteResume(savedResumeId);
                  setSavedResumeId(null);
                  toast.success("Resume Deleted from Database!");
                } else {
                  toast.error("No resume to delete!");
                }
              } catch (error) {
                console.error("Error deleting resume:", error);
                toast.error("Error Deleting Resume!");
              }
            }}
            className="btn btn-error"
            disabled={!savedResumeId}
          >
            <FaTrash className="mr-1" /> Delete
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mt-5 p-10 flex flex-col gap-3 items-center justify-center font-sans">
      {/* Selected Template Banner */}
      {selectedTemplate && (
        <div className="alert alert-success mb-4 max-w-2xl">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
          </svg>
          <div>
            <span className="font-medium">Template Selected:</span> {selectedTemplate.name} 
            <span className="text-sm opacity-70">({selectedTemplate.category})</span>
          </div>
        </div>
      )}
      {showFormUI && showFormFunction()}
      {showPromptInput && ShowInputField()}
      {showResumeUI && showResume()}
    </div>
  );
};

export default GenerateResume;
