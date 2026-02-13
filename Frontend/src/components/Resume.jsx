import React from "react";
import "daisyui/dist/full.css";
import { FaGithub, FaLinkedin, FaPhone, FaEnvelope } from "react-icons/fa";

const Resume = ({ data, template = null }) => {

  // Get template configuration
  const getTemplateConfig = () => {
    if (!template) {
      return {
        name: "Default",
        containerClass: "bg-white text-gray-800 font-sans",
        headerClass: "text-center border-b border-gray-300 pb-2",
        headerBg: "",
        headerText: "text-gray-800 text-xl font-semibold",
        sectionTitleClass: "text-sm font-bold text-gray-800 uppercase tracking-wide border-b border-gray-200 pb-1 mb-2",
        sectionBg: "",
        cardClass: "border-b border-gray-100 pb-2 mb-2",
        cardTitleClass: "font-semibold text-gray-800 text-sm",
        cardSubtitleClass: "text-gray-600 text-xs",
        cardTextClass: "text-gray-700 text-xs",
        badgeClass: "bg-gray-100 text-gray-700 border border-gray-300 rounded px-2 py-0.5 text-xs",
        dividerClass: "border-t border-gray-200 my-2",
        listClass: "list-disc pl-4 text-gray-700 text-xs",
        linkClass: "text-blue-600 hover:underline text-xs",
        containerPadding: "p-4",
        sectionPadding: "pt-2"
      };
    }

    switch (template.id) {
      case 1: // Modern Professional - Blue & Clean
        return {
          name: "Modern Professional",
          containerClass: "bg-white text-gray-800 font-sans",
          headerClass: "text-center bg-gray-50 border-b-2 border-blue-500 pb-3",
          headerBg: "",
          headerText: "text-blue-700 text-xl font-semibold",
          sectionTitleClass: "text-sm font-bold text-blue-700 uppercase tracking-wide border-b border-blue-200 pb-1 mb-2",
          sectionBg: "",
          cardClass: "bg-gray-50 border-l-2 border-blue-400 pl-3 pb-2 mb-2",
          cardTitleClass: "font-semibold text-blue-700 text-sm",
          cardSubtitleClass: "text-blue-600 text-xs font-medium",
          cardTextClass: "text-gray-700 text-xs",
          badgeClass: "bg-blue-100 text-blue-700 border border-blue-300 rounded px-2 py-0.5 text-xs font-medium",
          dividerClass: "border-t border-gray-200 my-2",
          listClass: "list-disc pl-4 text-gray-700 text-xs",
          linkClass: "text-blue-600 hover:text-blue-800 text-xs",
          containerPadding: "p-4",
          sectionPadding: "pt-2"
        };
      case 2: // Creative Designer - Vibrant & Modern
        return {
          name: "Creative Designer",
          containerClass: "bg-gradient-to-br from-white to-pink-50 text-gray-800 font-sans",
          headerClass: "text-center bg-gradient-to-r from-blue-500 to-pink-500 py-4 px-6 rounded-lg text-white mb-3",
          headerBg: "",
          headerText: "text-white text-xl font-semibold",
          sectionTitleClass: "text-sm font-bold text-pink-700 uppercase tracking-wide border-b border-pink-300 pb-1 mb-2",
          sectionBg: "",
          cardClass: "bg-white/80 border border-pink-200 rounded p-2 mb-2",
          cardTitleClass: "font-semibold text-pink-700 text-sm",
          cardSubtitleClass: "text-pink-600 text-xs font-medium",
          cardTextClass: "text-gray-700 text-xs",
          badgeClass: "bg-pink-100 text-pink-700 border border-pink-300 rounded px-2 py-0.5 text-xs font-medium",
          dividerClass: "border-t border-pink-200 my-2",
          listClass: "list-disc pl-4 text-gray-700 text-xs",
          linkClass: "text-pink-600 hover:text-pink-800 text-xs",
          containerPadding: "p-4",
          sectionPadding: "pt-2"
        };
      case 3: // Tech Developer - Dark & Code Style
        return {
          name: "Tech Developer",
          containerClass: "bg-gray-900 text-gray-100 font-mono",
          headerClass: "bg-gray-800 border-b border-emerald-500 pb-3 flex flex-col items-center",
          headerBg: "",
          headerText: "text-emerald-400 text-xl font-semibold",
          sectionTitleClass: "text-sm font-bold text-emerald-400 uppercase tracking-wider border-b border-emerald-600 pb-1 mb-2",
          sectionBg: "",
          cardClass: "bg-gray-800 border border-gray-700 p-2 mb-2",
          cardTitleClass: "font-semibold text-emerald-400 text-sm",
          cardSubtitleClass: "text-emerald-400 text-xs font-medium",
          cardTextClass: "text-gray-300 text-xs",
          badgeClass: "bg-gray-700 text-emerald-400 border border-emerald-600 rounded px-2 py-0.5 text-xs",
          dividerClass: "border-t border-gray-700 my-2",
          listClass: "list-disc pl-4 text-gray-300 text-xs",
          linkClass: "text-emerald-400 hover:text-emerald-300 text-xs",
          containerPadding: "p-4",
          sectionPadding: "pt-2"
        };
      case 4: // Executive Manager - Elegant & Dark
        return {
          name: "Executive Manager",
          containerClass: "bg-gradient-to-br from-white to-slate-100 text-gray-900 font-serif",
          headerClass: "text-center bg-gradient-to-r from-gray-800 to-gray-700 py-4 px-6 rounded-lg text-white mb-3",
          headerBg: "",
          headerText: "text-white text-xl font-semibold",
          sectionTitleClass: "text-sm font-bold text-slate-800 uppercase tracking-wider border-b-2 border-sky-500 pb-1 mb-2",
          sectionBg: "",
          cardClass: "bg-gradient-to-r from-white to-slate-100 border border-slate-300 p-2 mb-2",
          cardTitleClass: "font-semibold text-gray-800 text-sm",
          cardSubtitleClass: "text-sky-700 text-xs font-medium uppercase tracking-wide",
          cardTextClass: "text-gray-700 text-xs",
          badgeClass: "bg-sky-100 text-sky-800 border border-sky-300 rounded px-2 py-0.5 text-xs font-semibold",
          dividerClass: "border-t border-slate-300 my-2",
          listClass: "list-disc pl-4 text-gray-700 text-xs",
          linkClass: "text-sky-700 hover:text-sky-800 text-xs",
          containerPadding: "p-4",
          sectionPadding: "pt-2"
        };
      case 5: // Simple Clean - Minimalist
        return {
          name: "Simple Clean",
          containerClass: "bg-white text-gray-900 font-sans",
          headerClass: "text-center border-b-2 border-black pb-2 mb-2",
          headerBg: "",
          headerText: "text-black text-xl font-light tracking-wide",
          sectionTitleClass: "text-xs font-bold text-black uppercase tracking-widest border-b border-gray-200 pb-1 mb-2",
          sectionBg: "",
          cardClass: "border-b border-gray-100 pb-1 mb-2",
          cardTitleClass: "font-medium text-black text-xs",
          cardSubtitleClass: "text-gray-500 text-xs",
          cardTextClass: "text-gray-700 text-xs",
          badgeClass: "bg-gray-100 text-black border border-gray-300 rounded px-2 py-0.5 text-xs uppercase tracking-wide",
          dividerClass: "border-t border-gray-100 my-1",
          listClass: "list-disc pl-3 text-gray-700 text-xs",
          linkClass: "text-black underline decoration-1 underline-offset-2 text-xs",
          containerPadding: "p-4",
          sectionPadding: "pt-1"
        };
      case 6: // Academic Research - Teal & Formal
        return {
          name: "Academic Research",
          containerClass: "bg-gradient-to-br from-white to-emerald-50 text-gray-800 font-sans",
          headerClass: "bg-gradient-to-r from-emerald-700 to-emerald-600 py-3 px-4 rounded-lg text-white mb-2 flex justify-between items-center",
          headerBg: "",
          headerText: "text-white text-lg font-semibold",
          sectionTitleClass: "text-sm font-bold text-emerald-800 border-l-2 border-emerald-500 pl-2 py-0.5 mb-2 bg-emerald-50",
          sectionBg: "",
          cardClass: "bg-white border border-emerald-200 p-2 mb-2",
          cardTitleClass: "font-semibold text-emerald-800 text-sm",
          cardSubtitleClass: "text-emerald-600 text-xs font-medium",
          cardTextClass: "text-gray-700 text-xs",
          badgeClass: "bg-emerald-100 text-emerald-800 border border-emerald-300 rounded px-2 py-0.5 text-xs",
          dividerClass: "border-t border-emerald-200 my-2",
          listClass: "list-disc pl-4 text-gray-700 text-xs",
          linkClass: "text-emerald-600 hover:text-emerald-800 text-xs",
          containerPadding: "p-4",
          sectionPadding: "pt-2"
        };
      default:
        return getTemplateConfig();
    }
  };

  const config = getTemplateConfig();

  // Contact info based on template
  const showContactInHeader = !template || (template.id !== 2 && template.id !== 3 && template.id !== 4);

  return (
    <>
      {template && (
        <div className="text-center mb-3">
          <span className="rounded-full bg-sky-100 px-3 py-1 text-xs font-semibold text-sky-700">
            {config.name}
          </span>
        </div>
      )}
      <div
        className={`max-w-[210mm] mx-auto shadow-lg ${config.containerPadding} space-y-3 ${config.containerClass}`}
        style={{ minHeight: 'auto' }}
      >
        {/* Header Section */}
        <div className={config.headerClass}>
          <h1 className={`${config.headerText}`}>
            {data.personalInformation.fullName}
          </h1>
          {showContactInHeader && (
            <>
              <p className={`text-xs ${config.headerText.replace('text-', 'text-opacity-70 text-')}`}>
                {data.personalInformation.location}
              </p>
              <div className="flex justify-center gap-4 mt-1 flex-wrap text-xs">
                {data.personalInformation.email && (
                  <a
                    href={`mailto:${data.personalInformation.email}`}
                    className={`flex items-center ${config.linkClass}`}
                  >
                    <FaEnvelope className="mr-1 text-xs" /> {data.personalInformation.email}
                  </a>
                )}
                {data.personalInformation.phoneNumber && (
                  <span className={`flex items-center ${config.headerText.replace('text-', 'text-opacity-70 text-')}`}>
                    <FaPhone className="mr-1 text-xs" /> {data.personalInformation.phoneNumber}
                  </span>
                )}
              </div>
            </>
          )}
          <div className="flex justify-center gap-3 mt-1 flex-wrap text-xs">
            {data.personalInformation.gitHub && (
              <a
                href={data.personalInformation.gitHub}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${config.linkClass}`}
              >
                <FaGithub className="mr-1 text-xs" /> GitHub
              </a>
            )}
            {(data.personalInformation.linkedIn || data.personalInformation.linkedin) && (
              <a
                href={data.personalInformation.linkedIn || data.personalInformation.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex items-center ${config.linkClass}`}
              >
                <FaLinkedin className="mr-1 text-xs" /> LinkedIn
              </a>
            )}
          </div>
        </div>

        {/* Summary Section */}
        {data.summary && (
          <>
            <section className={config.sectionPadding}>
              <h2 className={config.sectionTitleClass}>Summary</h2>
              <p className={`leading-snug ${config.cardTextClass}`}>{data.summary}</p>
            </section>
            <div className={config.dividerClass}></div>
          </>
        )}

        {/* Skills Section */}
        {data.skills.length > 0 && (
          <>
            <section className={config.sectionPadding}>
              <h2 className={config.sectionTitleClass}>Skills</h2>
              <div className="flex flex-wrap gap-1">
                {data.skills.map((skill, index) => (
                  <span key={index} className={config.badgeClass}>
                    {skill.title} {skill.level && `- ${skill.level}`}
                  </span>
                ))}
              </div>
            </section>
            <div className={config.dividerClass}></div>
          </>
        )}

        {/* Experience Section */}
        {data.experience.length > 0 && (
          <>
            <section className={config.sectionPadding}>
              <h2 className={config.sectionTitleClass}>Experience</h2>
              {data.experience.map((exp, index) => (
                <div key={index} className={config.cardClass}>
                  <h3 className={config.cardTitleClass}>{exp.jobTitle}</h3>
                  <p className={config.cardSubtitleClass}>
                    {exp.company} {exp.location && `| ${exp.location}`}
                  </p>
                  {exp.duration && <p className="text-xs opacity-60 mb-1">{exp.duration}</p>}
                  {exp.responsibility && <p className={config.cardTextClass}>{exp.responsibility}</p>}
                </div>
              ))}
            </section>
            <div className={config.dividerClass}></div>
          </>
        )}

        {/* Education Section */}
        {data.education.length > 0 && (
          <>
            <section className={config.sectionPadding}>
              <h2 className={config.sectionTitleClass}>Education</h2>
              {data.education.map((edu, index) => (
                <div key={index} className={config.cardClass}>
                  <h3 className={config.cardTitleClass}>{edu.degree}</h3>
                  <p className={config.cardSubtitleClass}>
                    {edu.university} {edu.location && `| ${edu.location}`}
                  </p>
                  {edu.graduationYear && <p className="text-xs opacity-60">{edu.graduationYear}</p>}
                </div>
              ))}
            </section>
            <div className={config.dividerClass}></div>
          </>
        )}

        {/* Certifications Section */}
        {data.certifications.length > 0 && (
          <>
            <section className={config.sectionPadding}>
              <h2 className={config.sectionTitleClass}>Certifications</h2>
              {data.certifications.map((cert, index) => (
                <div key={index} className={config.cardClass}>
                  <h3 className={config.cardTitleClass}>{cert.title}</h3>
                  <p className={config.cardSubtitleClass}>
                    {cert.issuingOrganization} {cert.year && `| ${cert.year}`}
                  </p>
                </div>
              ))}
            </section>
            <div className={config.dividerClass}></div>
          </>
        )}

        {/* Projects Section */}
        {data.projects.length > 0 && (
          <>
            <section className={config.sectionPadding}>
              <h2 className={config.sectionTitleClass}>Projects</h2>
              {data.projects.map((proj, index) => (
                <div key={index} className={config.cardClass}>
                  <h3 className={config.cardTitleClass}>{proj.title}</h3>
                  {proj.description && <p className={config.cardTextClass}>{proj.description}</p>}
                  {proj.technologiesUsed && 
                    (Array.isArray(proj.technologiesUsed) ? 
                      proj.technologiesUsed.length > 0 : proj.technologiesUsed) && (
                      <div className="flex flex-wrap gap-1 mt-1">
                        {Array.isArray(proj.technologiesUsed) 
                          ? proj.technologiesUsed.map((tech, i) => (
                              <span key={i} className={config.badgeClass}>{tech}</span>
                            ))
                          : <span className={config.badgeClass}>{proj.technologiesUsed}</span>
                        }
                      </div>
                    )}
                  {proj.githubLink && (
                    <a href={proj.githubLink} target="_blank" rel="noopener noreferrer" className={config.linkClass}>
                      Project Link
                    </a>
                  )}
                </div>
              ))}
            </section>
            <div className={config.dividerClass}></div>
          </>
        )}

        {/* Languages Section */}
        {data.languages.length > 0 && (
          <>
            <section className={config.sectionPadding}>
              <h2 className={config.sectionTitleClass}>Languages</h2>
              <ul className={config.listClass}>
                {data.languages.map((lang, index) => (
                  <li key={index}>{lang.name}</li>
                ))}
              </ul>
            </section>
            <div className={config.dividerClass}></div>
          </>
        )}

        {/* Interests Section */}
        {data.interests.length > 0 && (
          <section className={config.sectionPadding}>
            <h2 className={config.sectionTitleClass}>Interests</h2>
            <ul className={config.listClass}>
              {data.interests.map((interest, index) => (
                <li key={index}>{interest.name}</li>
              ))}
            </ul>
          </section>
        )}
      </div>

      
    </>
  );
};

export default Resume;

