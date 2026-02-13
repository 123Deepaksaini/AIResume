import { jsPDF } from "jspdf";

export function downloadResumePdf(resume, fileSuffix = "") {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  const margin = 20;
  let y = 20;

  const addWrappedText = (text, x, yPos, maxWidth, lineHeight) => {
    const lines = doc.splitTextToSize(text || "", maxWidth);
    lines.forEach((line) => {
      if (yPos > 270) {
        doc.addPage();
        yPos = 20;
      }
      doc.text(line, x, yPos);
      yPos += lineHeight;
    });
    return yPos;
  };

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  y = addWrappedText(resume.fullName || "Your Name", margin, y, pageWidth - 2 * margin, 10);
  y += 5;

  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  const contactInfo = [resume.email, resume.phone, resume.location].filter(Boolean);
  y = addWrappedText(contactInfo.join(" | "), margin, y, pageWidth - 2 * margin, 5);
  y += 5;

  doc.setDrawColor(14, 165, 233);
  doc.setLineWidth(0.5);
  doc.line(margin, y, pageWidth - margin, y);
  y += 10;

  if (resume.summary) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    y = addWrappedText("SUMMARY", margin, y, pageWidth - 2 * margin, 7);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(resume.summary, margin, y, pageWidth - 2 * margin, 5);
    y += 5;
  }

  const skills = [
    resume.skill1,
    resume.skill2,
    resume.skill3,
    resume.skill4,
    resume.skill5,
    resume.skill6,
    resume.skill7,
    resume.skill8,
    resume.skill9,
    resume.skill10,
  ].filter(Boolean);

  if (skills.length > 0) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    y = addWrappedText("SKILLS", margin, y, pageWidth - 2 * margin, 7);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(skills.join(" - "), margin, y, pageWidth - 2 * margin, 5);
    y += 5;
  }

  if (resume.company1 || resume.company2) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    y = addWrappedText("EXPERIENCE", margin, y, pageWidth - 2 * margin, 7);

    doc.setFontSize(10);
    if (resume.company1) {
      doc.setFont("helvetica", "bold");
      y = addWrappedText(resume.position1 || "Position", margin, y, pageWidth - 2 * margin, 5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(14, 165, 233);
      y = addWrappedText(resume.company1, margin, y, pageWidth - 2 * margin, 5);
      doc.setTextColor(0, 0, 0);
      y = addWrappedText(resume.duration1 || "", margin, y, pageWidth - 2 * margin, 5);
      y += 3;
    }
    if (resume.company2) {
      doc.setFont("helvetica", "bold");
      y = addWrappedText(resume.position2 || "Position", margin, y, pageWidth - 2 * margin, 5);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(14, 165, 233);
      y = addWrappedText(resume.company2, margin, y, pageWidth - 2 * margin, 5);
      doc.setTextColor(0, 0, 0);
      y = addWrappedText(resume.duration2 || "", margin, y, pageWidth - 2 * margin, 5);
      y += 3;
    }
    y += 2;
  }

  if (resume.degree1) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    y = addWrappedText("EDUCATION", margin, y, pageWidth - 2 * margin, 7);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    y = addWrappedText(resume.degree1, margin, y, pageWidth - 2 * margin, 5);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(resume.university1 || "", margin, y, pageWidth - 2 * margin, 5);
    y = addWrappedText(resume.graduationYear1 || "", margin, y, pageWidth - 2 * margin, 5);
    y += 5;
  }

  if (resume.project1 || resume.project2) {
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    y = addWrappedText("PROJECTS", margin, y, pageWidth - 2 * margin, 7);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    if (resume.project1) {
      y = addWrappedText("- " + resume.project1, margin, y, pageWidth - 2 * margin, 5);
    }
    if (resume.project2) {
      y = addWrappedText("- " + resume.project2, margin, y, pageWidth - 2 * margin, 5);
    }
  }

  if (resume.coverLetter) {
    if (y > 230) {
      doc.addPage();
      y = 20;
    }
    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    y = addWrappedText("COVER LETTER", margin, y, pageWidth - 2 * margin, 7);
    doc.setFontSize(10);
    doc.setFont("helvetica", "normal");
    y = addWrappedText(resume.coverLetter, margin, y, pageWidth - 2 * margin, 5);
  }

  const name = resume.fullName || "resume";
  const suffix = fileSuffix ? `_${fileSuffix}` : "";
  doc.save(`${name}${suffix}.pdf`);
}
