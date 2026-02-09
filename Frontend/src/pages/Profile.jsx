import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { getResumesByUserEmail, deleteResume } from "../api/ResumeService";
import toast from "react-hot-toast";
import { FaUser, FaTrash, FaDownload, FaEnvelope, FaCalendar, FaEye } from "react-icons/fa";
import Resume from "../components/Resume";
import { useSearchParams } from "react-router";
import { jsPDF } from "jspdf";

function Profile() {
  const { user, isAuthenticated } = useAuth();
  const [searchParams] = useSearchParams();
  const [savedResumes, setSavedResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedResume, setSelectedResume] = useState(null);
  const [showResumeModal, setShowResumeModal] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  useEffect(() => {
    if (isAuthenticated) {
      fetchUserResumes();
    }
  }, [isAuthenticated]);

  // Check for resumeId in URL params
  useEffect(() => {
    if (savedResumes.length > 0) {
      const resumeId = searchParams.get("resumeId");
      if (resumeId) {
        const resume = savedResumes.find(r => r.id === parseInt(resumeId));
        if (resume) {
          setSelectedResume(resume);
          setShowResumeModal(true);
        }
      }
    }
  }, [savedResumes, searchParams]);

  const fetchUserResumes = async () => {
    try {
      setLoading(true);
      const resumes = await getResumesByUserEmail(user.email);
      setSavedResumes(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast.error("Error loading resumes");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteResume = async (id) => {
    try {
      await deleteResume(id);
      setSavedResumes(savedResumes.filter((r) => r.id !== id));
      toast.success("Resume deleted!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Error deleting resume");
    }
  };

  const handleViewResume = (resume) => {
    setSelectedResume(resume);
    setShowResumeModal(true);
  };

  const handleDownloadPDF = (resume) => {
    setDownloadingId(resume.id);
    
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 20;
      let y = 20;
      
      // Helper function to add text with word wrap
      const addWrappedText = (text, x, yPos, maxWidth, lineHeight) => {
        const lines = doc.splitTextToSize(text || '', maxWidth);
        lines.forEach(line => {
          if (yPos > 270) {
            doc.addPage();
            yPos = 20;
          }
          doc.text(line, x, yPos);
          yPos += lineHeight;
        });
        return yPos;
      };
      
      // Name
      doc.setFontSize(24);
      doc.setFont('helvetica', 'bold');
      y = addWrappedText(resume.fullName || 'Your Name', margin, y, pageWidth - 2 * margin, 10);
      y += 5;
      
      // Contact Info
      doc.setFontSize(10);
      doc.setFont('helvetica', 'normal');
      let contactInfo = [];
      if (resume.email) contactInfo.push(resume.email);
      if (resume.phone) contactInfo.push(resume.phone);
      if (resume.location) contactInfo.push(resume.location);
      y = addWrappedText(contactInfo.join(' | '), margin, y, pageWidth - 2 * margin, 5);
      y += 5;
      
      // Divider
      doc.setDrawColor(79, 70, 229); // Purple color
      doc.setLineWidth(0.5);
      doc.line(margin, y, pageWidth - margin, y);
      y += 10;
      
      // Summary
      if (resume.summary) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y = addWrappedText('SUMMARY', margin, y, pageWidth - 2 * margin, 7);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        y = addWrappedText(resume.summary, margin, y, pageWidth - 2 * margin, 5);
        y += 5;
      }
      
      // Skills
      const skills = [resume.skill1, resume.skill2, resume.skill3, resume.skill4, resume.skill5, 
                     resume.skill6, resume.skill7, resume.skill8, resume.skill9, resume.skill10]
                     .filter(Boolean);
      if (skills.length > 0) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y = addWrappedText('SKILLS', margin, y, pageWidth - 2 * margin, 7);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        y = addWrappedText(skills.join(' • '), margin, y, pageWidth - 2 * margin, 5);
        y += 5;
      }
      
      // Experience
      if (resume.company1 || resume.company2) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y = addWrappedText('EXPERIENCE', margin, y, pageWidth - 2 * margin, 7);
        
        doc.setFontSize(10);
        if (resume.company1) {
          doc.setFont('helvetica', 'bold');
          y = addWrappedText(resume.position1 || 'Position', margin, y, pageWidth - 2 * margin, 5);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(79, 70, 229);
          y = addWrappedText(resume.company1, margin, y, pageWidth - 2 * margin, 5);
          doc.setTextColor(0, 0, 0);
          y = addWrappedText(resume.duration1 || '', margin, y, pageWidth - 2 * margin, 5);
          y += 3;
        }
        if (resume.company2) {
          doc.setFont('helvetica', 'bold');
          y = addWrappedText(resume.position2 || 'Position', margin, y, pageWidth - 2 * margin, 5);
          doc.setFont('helvetica', 'normal');
          doc.setTextColor(79, 70, 229);
          y = addWrappedText(resume.company2, margin, y, pageWidth - 2 * margin, 5);
          doc.setTextColor(0, 0, 0);
          y = addWrappedText(resume.duration2 || '', margin, y, pageWidth - 2 * margin, 5);
          y += 3;
        }
        y += 2;
      }
      
      // Education
      if (resume.degree1) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y = addWrappedText('EDUCATION', margin, y, pageWidth - 2 * margin, 7);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'bold');
        y = addWrappedText(resume.degree1, margin, y, pageWidth - 2 * margin, 5);
        doc.setFont('helvetica', 'normal');
        y = addWrappedText(resume.university1 || '', margin, y, pageWidth - 2 * margin, 5);
        y = addWrappedText(resume.graduationYear1 || '', margin, y, pageWidth - 2 * margin, 5);
        y += 5;
      }
      
      // Projects
      if (resume.project1 || resume.project2) {
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y = addWrappedText('PROJECTS', margin, y, pageWidth - 2 * margin, 7);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        if (resume.project1) {
          y = addWrappedText('• ' + resume.project1, margin, y, pageWidth - 2 * margin, 5);
        }
        if (resume.project2) {
          y = addWrappedText('• ' + resume.project2, margin, y, pageWidth - 2 * margin, 5);
        }
      }
      
      // Cover Letter
      if (resume.coverLetter) {
        if (y > 230) {
          doc.addPage();
          y = 20;
        }
        doc.setFontSize(14);
        doc.setFont('helvetica', 'bold');
        y = addWrappedText('COVER LETTER', margin, y, pageWidth - 2 * margin, 7);
        doc.setFontSize(10);
        doc.setFont('helvetica', 'normal');
        y = addWrappedText(resume.coverLetter, margin, y, pageWidth - 2 * margin, 5);
      }
      
      // Save PDF
      doc.save(`${resume.fullName || 'resume'}_${resume.id}.pdf`);
      toast.success("PDF downloaded!");
    } catch (error) {
      console.error("Error downloading PDF:", error);
      toast.error("Error downloading PDF");
    } finally {
      setDownloadingId(null);
    }
  };

  // Convert database resume format to frontend format for display
  const convertToFrontendFormat = (dbResume) => {
    return {
      personalInformation: {
        fullName: dbResume.fullName || "",
        email: dbResume.email || "",
        phoneNumber: dbResume.phone || "",
        location: dbResume.location || "",
      },
      summary: dbResume.summary || "",
      skills: [
        { title: dbResume.skill1, level: "" },
        { title: dbResume.skill2, level: "" },
        { title: dbResume.skill3, level: "" },
        { title: dbResume.skill4, level: "" },
        { title: dbResume.skill5, level: "" },
        { title: dbResume.skill6, level: "" },
        { title: dbResume.skill7, level: "" },
        { title: dbResume.skill8, level: "" },
        { title: dbResume.skill9, level: "" },
        { title: dbResume.skill10, level: "" },
      ].filter(s => s.title),
      experience: [
        { company: dbResume.company1, jobTitle: dbResume.position1, duration: dbResume.duration1 },
        { company: dbResume.company2, jobTitle: dbResume.position2, duration: dbResume.duration2 },
      ].filter(e => e.company),
      education: [
        { degree: dbResume.degree1, university: dbResume.university1, graduationYear: dbResume.graduationYear1 },
      ].filter(e => e.degree),
      projects: [
        { title: dbResume.project1, description: "" },
        { title: dbResume.project2, description: "" },
      ].filter(p => p.title),
    };
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <FaUser className="text-6xl mx-auto mb-4 text-base-content/30" />
          <h2 className="text-2xl font-bold mb-2">Please Login</h2>
          <p className="text-base-content/60">You need to login to view your profile.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Profile Header */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6 mb-6">
          <div className="flex items-center gap-6">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-20">
                <span className="text-2xl">{user?.name?.charAt(0).toUpperCase()}</span>
              </div>
            </div>
            <div>
              <h1 className="text-3xl font-bold">{user?.name}</h1>
              <div className="flex items-center gap-2 text-base-content/60 mt-1">
                <FaEnvelope />
                <span>{user?.email}</span>
              </div>
              <div className="flex items-center gap-2 text-base-content/60 mt-1">
                <FaCalendar />
                <span>Member since {new Date().getFullYear()}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Saved Resumes Section */}
        <div className="bg-base-100 rounded-lg shadow-lg p-6">
          <h2 className="text-2xl font-bold mb-6">My Saved Resumes ({savedResumes.length})</h2>

          {loading ? (
            <div className="flex justify-center py-12">
              <span className="loading loading-spinner loading-lg"></span>
            </div>
          ) : savedResumes.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {savedResumes.map((resume) => (
                <div 
                  key={resume.id} 
                  className="bg-base-200 rounded-lg p-4 hover:shadow-lg transition-shadow"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="font-semibold text-lg">{resume.fullName || "Untitled Resume"}</h3>
                      <p className="text-sm text-base-content/60">
                        {resume.createdAt ? new Date(resume.createdAt).toLocaleDateString() : "Recently saved"}
                      </p>
                    </div>
                  </div>
                  <div className="text-sm text-base-content/60 mb-3">
                    {resume.email && <p>Email: {resume.email}</p>}
                    {resume.location && <p>Location: {resume.location}</p>}
                    <p className="mt-2">
                      {resume.skill1 || resume.skill2 || resume.skill3 ? (
                        <span className="truncate">
                          Skills: {[resume.skill1, resume.skill2, resume.skill3].filter(Boolean).join(", ")}
                        </span>
                      ) : null}
                    </p>
                  </div>
                  {/* View, Download (PDF), Delete Buttons */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleViewResume(resume)}
                      className="btn btn-info btn-sm flex-1"
                    >
                      <FaEye className="mr-1" /> View
                    </button>
                    <button
                      onClick={() => handleDownloadPDF(resume)}
                      disabled={downloadingId === resume.id}
                      className="btn btn-success btn-sm flex-1"
                    >
                      {downloadingId === resume.id ? (
                        <span className="loading loading-spinner loading-xs"></span>
                      ) : (
                        <><FaDownload className="mr-1" /> PDF</>
                      )}
                    </button>
                    <button
                      onClick={() => handleDeleteResume(resume.id)}
                      className="btn btn-error btn-sm"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <FaUser className="text-6xl mx-auto mb-4 text-base-content/30" />
              <h3 className="text-xl font-semibold mb-2">No saved resumes yet</h3>
              <p className="text-base-content/60 mb-4">Generate your first resume and save it to see it here.</p>
              <a href="/generate-resume" className="btn btn-primary">
                Generate Resume
              </a>
            </div>
          )}
        </div>
      </div>

      {/* Resume View Modal */}
      {showResumeModal && selectedResume && (
        <div className="modal modal-open">
          <div className="modal-box max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl">Resume Preview</h3>
              <button 
                onClick={() => setShowResumeModal(false)}
                className="btn btn-sm btn-circle"
              >
                ✕
              </button>
            </div>
            <Resume 
              data={convertToFrontendFormat(selectedResume)} 
              template={{ id: 1, name: "Modern", category: "Modern" }}
            />
            <div className="modal-action">
              <button 
                onClick={() => handleDownloadPDF(selectedResume)}
                disabled={downloadingId === selectedResume.id}
                className="btn btn-success"
              >
                {downloadingId === selectedResume.id ? (
                  <span className="loading loading-spinner loading-sm"></span>
                ) : (
                  <><FaDownload className="mr-2" /> Download PDF</>
                )}
              </button>
              <button 
                onClick={() => setShowResumeModal(false)}
                className="btn"
              >
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop" onClick={() => setShowResumeModal(false)}></div>
        </div>
      )}
    </div>
  );
}

export default Profile;
