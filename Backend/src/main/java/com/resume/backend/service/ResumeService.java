package com.resume.backend.service;

import com.resume.backend.entity.Resume;
import java.io.IOException;
import java.util.List;
import java.util.Map;

public interface ResumeService {

    Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException;

    Map<String, Object> generateInterviewQuestionsBySkills(List<String> skills);

    Resume saveResume(Resume resume);

    List<Resume> getResumesByUserEmail(String userEmail);

    Resume getResumeById(Long id);

    void deleteResume(Long id);
}
