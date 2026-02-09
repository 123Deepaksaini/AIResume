package com.resume.backend.service;

import com.resume.backend.entity.Resume;
import com.resume.backend.repository.ResumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@Service
public class ResumeServiceImpl implements ResumeService {

    private final GroqService groqService;
    private final ResumeRepository resumeRepository;

    @Autowired
    public ResumeServiceImpl(GroqService groqService, ResumeRepository resumeRepository) {
        this.groqService = groqService;
        this.resumeRepository = resumeRepository;
    }

    @Override
    public Map<String, Object> generateResumeResponse(String userResumeDescription) throws IOException {
        return groqService.generateResume(userResumeDescription);
    }

    @Override
    public Resume saveResume(Resume resume) {
        return resumeRepository.save(resume);
    }

    @Override
    public List<Resume> getResumesByUserEmail(String userEmail) {
        return resumeRepository.findByUserEmailOrderByCreatedAtDesc(userEmail);
    }

    @Override
    public Resume getResumeById(Long id) {
        return resumeRepository.findById(id).orElse(null);
    }

    @Override
    public void deleteResume(Long id) {
        resumeRepository.deleteById(id);
    }
}
