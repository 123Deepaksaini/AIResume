import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/AuthContext";
import { getResumesByUserEmail, deleteResume } from "../api/ResumeService";
import toast from "react-hot-toast";
import { FaTrash, FaDownload } from "react-icons/fa";
import { jsPDF } from "jspdf";

function Navbar() {
  const { user, isAuthenticated, login, logout } = useAuth();
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [savedResumes, setSavedResumes] = useState([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [downloadingId, setDownloadingId] = useState(null);

  // Fetch saved resumes when profile dropdown opens
  useEffect(() => {
    if (isAuthenticated && showProfileDropdown) {
      fetchUserResumes();
    }
  }, [isAuthenticated, showProfileDropdown]);

  const fetchUserResumes = async () => {
    try {
      setLoadingResumes(true);
      const resumes = await getResumesByUserEmail(user.email);
      setSavedResumes(resumes);
    } catch (error) {
      console.error("Error fetching resumes:", error);
      toast.error("Error loading resumes");
    } finally {
      setLoadingResumes(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
      toast.success(`Welcome!`);
      setShowLoginModal(false);
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error("Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setShowProfileDropdown(false);
    logout();
    toast.success("Logged out!");
  };

  const handleDeleteResume = async (id, e) => {
    e.stopPropagation();
    try {
      await deleteResume(id);
      setSavedResumes(savedResumes.filter((r) => r.id !== id));
      toast.success("Resume deleted!");
    } catch (error) {
      console.error("Error deleting resume:", error);
      toast.error("Error deleting resume");
    }
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

  return (
    <>
      <div className="navbar shadow bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li><Link to={"/"}>Home</Link></li>
              <li><Link to={"/about"}>About</Link></li>
              <li><Link to={"/services"}>Services</Link></li>
              <li><Link to={"/generate-resume"}>Resume</Link></li>
              <li><Link to={"/cover-letter"}>Cover Letter</Link></li>
              <li><Link to={"/career-insights"}>Career</Link></li>
              <li><Link to={"/interview-prep"}>Interview</Link></li>
              {isAuthenticated ? (
                <>
                  <li><Link to={"/profile"}>My Profile</Link></li>
                  <li><button onClick={handleLogout} className="text-error">Logout</button></li>
                </>
              ) : (
                <li><button onClick={() => setShowLoginModal(true)}>Login</button></li>
              )}
            </ul>
          </div>
          <Link to={"/"} className="btn btn-ghost text-xl">AI Resume</Link>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 gap-1">
            <li><Link to={"/"} className="rounded-lg">Home</Link></li>
            <li><Link to={"/about"} className="rounded-lg">About</Link></li>
            <li><Link to={"/services"} className="rounded-lg">Services</Link></li>
          </ul>
        </div>
        <div className="navbar-end">
          {isAuthenticated ? (
            <div className="relative">
              <div 
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              >
                <div className="avatar placeholder">
                  <div className="bg-primary text-primary-content rounded-full w-8">
                    <span className="text-sm">{user?.name?.charAt(0).toUpperCase()}</span>
                  </div>
                </div>
              </div>

              {/* Small Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute right-0 mt-2 w-64 bg-base-100 rounded-lg shadow-lg z-50 border border-base-200">
                  {/* User Info */}
                  <div className="p-2 border-b border-base-200 flex items-center gap-2">
                    <div className="avatar placeholder">
                      <div className="bg-primary text-primary-content rounded-full w-8">
                        <span className="text-xs">{user?.name?.charAt(0).toUpperCase()}</span>
                      </div>
                    </div>
                    <div className="min-w-0">
                      <p className="font-medium text-sm truncate">{user?.name}</p>
                      <p className="text-xs text-base-content/60 truncate">{user?.email}</p>
                    </div>
                  </div>
                  
                  {/* Saved Resumes */}
                  <div className="p-2 max-h-48 overflow-y-auto">
                    <p className="text-xs font-semibold text-base-content/60 px-1 mb-1">MY RESUMES</p>
                    {loadingResumes ? (
                      <div className="flex justify-center p-2">
                        <span className="loading loading-spinner loading-xs"></span>
                      </div>
                    ) : savedResumes.length > 0 ? (
                      <ul className="space-y-1">
                        {savedResumes.map((resume) => (
                          <li 
                            key={resume.id} 
                            className="flex items-center justify-between p-1.5 bg-base-200 rounded hover:bg-base-300 transition-colors text-xs"
                          >
                            <span className="truncate flex-1">{resume.fullName || "Untitled"}</span>
                            <div className="flex items-center gap-0.5 ml-1">
                              <button
                                onClick={() => handleDownloadPDF(resume)}
                                disabled={downloadingId === resume.id}
                                className="btn btn-ghost btn-xs text-success p-1"
                                title="Download PDF"
                              >
                                {downloadingId === resume.id ? (
                                  <span className="loading loading-spinner loading-xs"></span>
                                ) : (
                                  <FaDownload className="w-3 h-3" />
                                )}
                              </button>
                              <button
                                onClick={(e) => handleDeleteResume(resume.id, e)}
                                className="btn btn-ghost btn-xs text-error p-1"
                                title="Delete"
                              >
                                <FaTrash className="w-3 h-3" />
                              </button>
                            </div>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-xs text-base-content/60 text-center py-2">No resumes saved</p>
                    )}
                  </div>

                  {/* Footer Actions */}
                  <div className="p-2 border-t border-base-200 flex gap-1">
                    <Link 
                      to={"/generate-resume"} 
                      className="btn btn-primary btn-xs flex-1"
                      onClick={() => setShowProfileDropdown(false)}
                    >
                      New Resume
                    </Link>
                    <button 
                      onClick={handleLogout}
                      className="btn btn-error btn-xs"
                    >
                      Logout
                    </button>
                  </div>
                </div>
              )}

              {/* Click outside to close */}
              {showProfileDropdown && (
                <div 
                  className="fixed inset-0 z-40" 
                  onClick={() => setShowProfileDropdown(false)}
                ></div>
              )}
            </div>
          ) : (
            <button
              onClick={() => setShowLoginModal(true)}
              className="btn btn-primary btn-sm"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Login Modal */}
      {showLoginModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg mb-4">Login</h3>
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="Email"
                  className="input input-bordered w-full"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="form-control mt-4">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input
                  type="password"
                  placeholder="Password"
                  className="input input-bordered w-full"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="modal-action">
                <button
                  type="button"
                  className="btn"
                  onClick={() => setShowLoginModal(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary" disabled={isLoading}>
                  {isLoading ? <span className="loading loading-spinner loading-sm"></span> : "Login"}
                </button>
              </div>
            </form>
          </div>
          <div className="modal-backdrop" onClick={() => setShowLoginModal(false)}></div>
        </div>
      )}
    </>
  );
}

export default Navbar;
