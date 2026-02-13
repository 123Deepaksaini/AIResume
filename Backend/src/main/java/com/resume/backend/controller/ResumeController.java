package com.resume.backend.controller;

import com.resume.backend.entity.Resume;
import com.resume.backend.service.ResumeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class ResumeController {

    private static final Logger log = LoggerFactory.getLogger(ResumeController.class);

    private final ResumeService resumeService;

    public ResumeController(ResumeService resumeService) {
        this.resumeService = resumeService;
    }

    @PostMapping("/resume/generate")
    public ResponseEntity<Map<String, Object>> generateResume(
            @RequestBody Map<String, String> requestBody
    ) throws IOException {

        String userDescription = requestBody.get("userDescription");
        Map<String, Object> response = resumeService.generateResumeResponse(userDescription);
        return new ResponseEntity<>(response, HttpStatus.OK);
    }

    @PostMapping("/resume/save")
    public ResponseEntity<Resume> saveResume(@RequestBody Resume resume) {
        log.info("Received resume save request: {}", resume);
        Resume savedResume = resumeService.saveResume(resume);
        log.info("Saved resume with id: {}", savedResume.getId());
        return new ResponseEntity<>(savedResume, HttpStatus.CREATED);
    }

    @GetMapping("/resume/user/{userEmail}")
    public ResponseEntity<List<Resume>> getResumesByUserEmail(@PathVariable String userEmail) {
        List<Resume> resumes = resumeService.getResumesByUserEmail(userEmail);
        return ResponseEntity.ok(resumes);
    }

    @GetMapping("/resume/{id}")
    public ResponseEntity<Resume> getResumeById(@PathVariable Long id) {
        Resume resume = resumeService.getResumeById(id);
        if (resume != null) {
            return ResponseEntity.ok(resume);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/resume/{id}")
    public ResponseEntity<Void> deleteResume(@PathVariable Long id) {
        resumeService.deleteResume(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/interview/questions/skills")
    public ResponseEntity<Map<String, Object>> getInterviewQuestionsBySkills(
            @RequestBody(required = false) Map<String, Object> requestBody
    ) {
        try {
            List<String> skills = extractSkills(requestBody);
            Map<String, Object> response = resumeService.generateInterviewQuestionsBySkills(skills);
            return ResponseEntity.ok(response);
        } catch (Exception e) {
            log.error("Failed to generate skill-based interview questions", e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(createFallbackResponse(extractSkills(requestBody)));
        }
    }

    @GetMapping("/interview/questions")
    public ResponseEntity<Map<String, Object>> getInterviewQuestions() {
        return ResponseEntity.ok(createFallbackResponse(Collections.emptyList()));
    }

    private List<String> extractSkills(Map<String, Object> requestBody) {
        if (requestBody == null || !requestBody.containsKey("skills")) {
            return Collections.emptyList();
        }

        Object rawSkills = requestBody.get("skills");
        if (!(rawSkills instanceof List<?> listSkills)) {
            return Collections.emptyList();
        }

        List<String> parsedSkills = new ArrayList<>();
        for (Object item : listSkills) {
            if (item != null) {
                String val = String.valueOf(item).trim();
                if (!val.isBlank()) {
                    parsedSkills.add(val);
                }
            }
        }
        return parsedSkills;
    }

    private Map<String, Object> createFallbackResponse(List<String> skills) {
        Map<String, Object> response = new HashMap<>();

        String focus = skills.isEmpty() ? "software engineering" : String.join(", ", skills);
        List<Map<String, String>> questions = Arrays.asList(
                createQuestion(
                        "Walk me through your background and highlight experience with " + focus,
                        "I have built production-focused projects and consistently improved performance, maintainability, and delivery quality. My strongest contributions are in problem solving, communication, and ownership.",
                        "behavioral"
                ),
                createQuestion(
                        "How have you applied " + focus + " in a real project?",
                        "I start by defining clear requirements, break work into milestones, and validate outcomes with metrics. I emphasize clean implementation, testing, and stakeholder communication throughout the project lifecycle.",
                        "technical"
                ),
                createQuestion(
                        "Describe a challenging issue you solved and your approach.",
                        "I reproduced the issue, collected logs and signals, isolated root cause, and shipped an incremental fix. Then I added monitoring and documentation to prevent recurrence.",
                        "problem-solving"
                )
        );

        response.put("meta", "Fallback interview prep generated");
        response.put("skills", skills);
        response.put("questions", questions);
        response.put("total", questions.size());
        return response;
    }

    private Map<String, String> createQuestion(String question, String answer, String category) {
        Map<String, String> qa = new HashMap<>();
        qa.put("question", question);
        qa.put("answer", answer);
        qa.put("category", category);
        return qa;
    }
}
