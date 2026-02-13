import React, { useEffect, useState } from "react";
import { Link } from "react-router";
import toast from "react-hot-toast";
import { FaUser, FaTrash, FaDownload, FaEnvelope, FaCalendar } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { getResumesByUserEmail, deleteResume } from "../api/ResumeService";
import { downloadResumePdf } from "../utils/resumePdf";

function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [savedResumes, setSavedResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserResumes();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchUserResumes = async () => {
    try {
      setLoading(true);
      const resumes = await getResumesByUserEmail(user.email);
      setSavedResumes(resumes);
    } catch (error) {
      toast.error("Error loading resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      await deleteResume(id);
      setSavedResumes(savedResumes.filter((r) => r.id !== id));
      toast.success("Resume deleted");
    } catch (error) {
      toast.error("Error deleting resume");
    }
  };

  const handleDownloadPdf = (resume) => {
    setDownloadingId(resume.id);
    try {
      downloadResumePdf(resume, String(resume.id));
      toast.success("PDF downloaded");
    } catch (error) {
      toast.error("Error downloading PDF");
    } finally {
      setDownloadingId(null);
    }
  };

  if (!isAuthenticated) {
    return (
      <main className="home-surface min-h-screen flex items-center justify-center px-6 text-slate-900">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <FaUser className="mx-auto mb-4 text-5xl text-slate-300" />
          <h2 className="text-2xl font-black">Please Login</h2>
          <p className="mt-2 text-slate-600">You need to login to access your profile.</p>
        </div>
      </main>
    );
  }

  return (
    <main className="home-surface min-h-screen px-6 pb-20 pt-10 text-slate-900 md:px-10">
      <section className="mx-auto max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-md md:p-8">
        <div className="flex flex-wrap items-center justify-center gap-5 text-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-sky-600 text-2xl font-black text-white">
            {user?.name?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-3xl font-black" style={{ fontFamily: '"Space Grotesk", "Segoe UI", sans-serif' }}>{user?.name}</h1>
            <p className="mt-1 flex items-center justify-center gap-2 text-slate-600"><FaEnvelope className="text-xs" /> {user?.email}</p>
            <p className="mt-1 flex items-center justify-center gap-2 text-slate-600"><FaCalendar className="text-xs" /> Member since {new Date().getFullYear()}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto mt-6 max-w-6xl rounded-3xl border border-slate-200 bg-white p-6 shadow-md md:p-8">
        <h2 className="text-center text-2xl font-black" style={{ fontFamily: '"Space Grotesk", "Segoe UI", sans-serif' }}>
          My Saved Resumes ({savedResumes.length})
        </h2>

        {loading ? (
          <div className="flex justify-center py-10"><span className="loading loading-spinner loading-lg"></span></div>
        ) : savedResumes.length > 0 ? (
          <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {savedResumes.map((resume) => (
              <article key={resume.id} className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <h3 className="text-lg font-bold text-slate-900">{resume.fullName || "Untitled Resume"}</h3>
                <p className="text-sm text-slate-500">
                  {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : "Recently saved"}
                </p>

                <div className="mt-3 text-sm text-slate-600">
                  {resume.email && <p>Email: {resume.email}</p>}
                  {resume.location && <p>Location: {resume.location}</p>}
                  <p className="mt-2">Skills: {[resume.skill1, resume.skill2, resume.skill3].filter(Boolean).join(", ") || "N/A"}</p>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    onClick={() => handleDownloadPdf(resume)}
                    disabled={downloadingId === resume.id}
                    className="btn flex-1 border-0 bg-emerald-600 text-white hover:bg-emerald-700"
                  >
                    {downloadingId === resume.id ? <span className="loading loading-spinner loading-xs"></span> : <><FaDownload className="text-xs" /> PDF</>}
                  </button>
                  <button onClick={() => handleDeleteResume(resume.id)} className="btn border-0 bg-pink-600 text-white hover:bg-pink-700">
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-slate-50 p-8 text-center">
            <FaUser className="mx-auto mb-4 text-5xl text-slate-300" />
            <h3 className="text-xl font-bold">No saved resumes yet</h3>
            <p className="mt-2 text-slate-600">Generate and save your first resume.</p>
            <Link to="/generate-resume" className="btn mt-4 border-0 bg-sky-600 text-white hover:bg-sky-700">Generate Resume</Link>
          </div>
        )}
      </section>
    </main>
  );
}

export default Profile;
