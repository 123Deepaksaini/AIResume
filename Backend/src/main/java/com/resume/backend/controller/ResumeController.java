package com.resume.backend.controller;

import com.resume.backend.entity.Resume;
import com.resume.backend.service.ResumeService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.HashMap;

@RestController
@CrossOrigin("*")
@RequestMapping("/api/v1")
public class ResumeController {

    private static final Logger log = LoggerFactory.getLogger(ResumeController.class);

    private ResumeService resumeService;

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

    @GetMapping("/interview/questions")
    public ResponseEntity<Map<String, Object>> getInterviewQuestions() {
        Map<String, Object> response = new HashMap<>();

        List<Map<String, String>> questions = Arrays.asList(
            createQuestion("Tell me about yourself",
                "I am a passionate software developer with 3+ years of experience in full-stack development. I specialize in React.js, Node.js, and cloud technologies. I have successfully delivered multiple projects and enjoy solving complex problems through clean, efficient code."),
            createQuestion("What are your strengths?",
                "My key strengths include: 1) Strong problem-solving skills, 2) Quick learning ability for new technologies, 3) Excellent communication and teamwork, 4) Attention to detail and code quality, 5) Ability to work under pressure and meet deadlines."),
            createQuestion("What are your weaknesses?",
                "I tend to be overly critical of my own work, which sometimes leads to spending extra time on perfection. However, I've learned to balance quality with efficiency by setting realistic timelines and getting feedback from peers early in the process."),
            createQuestion("Why do you want to work here?",
                "I'm excited about this opportunity because your company is at the forefront of innovation in [industry/field]. I admire your commitment to [specific company value or project], and I believe my skills in [relevant skills] would allow me to contribute meaningfully to your team's goals."),
            createQuestion("Where do you see yourself in 5 years?",
                "In 5 years, I see myself as a senior developer leading projects and mentoring junior developers. I want to continue growing my expertise in [specific technologies] while taking on more leadership responsibilities and contributing to the broader technical strategy of the organization."),
            createQuestion("Why should we hire you?",
                "You should hire me because I bring a unique combination of technical expertise, problem-solving skills, and a proven track record of delivering high-quality solutions. My experience with [relevant technologies] and my passion for continuous learning make me an ideal fit for this role."),
            createQuestion("What is your greatest achievement?",
                "My greatest achievement was leading the development of a real-time analytics dashboard that improved decision-making processes for a team of 50+ users. The project involved complex data processing, real-time updates, and intuitive visualizations, resulting in a 40% improvement in operational efficiency."),
            createQuestion("How do you handle pressure?",
                "I handle pressure by staying organized, prioritizing tasks, and maintaining clear communication with my team. I break down complex problems into manageable steps, set realistic deadlines, and don't hesitate to ask for help when needed. Regular breaks and maintaining work-life balance also help me stay productive."),
            createQuestion("What motivates you?",
                "I'm motivated by solving complex problems, learning new technologies, and seeing the impact of my work on users and the business. I enjoy working in collaborative environments where I can contribute ideas, learn from others, and grow both personally and professionally."),
            createQuestion("Do you have any questions for us?",
                "Yes, I do! 1) Can you tell me about the team I'd be working with? 2) What are the biggest challenges the team is facing right now? 3) How do you measure success for this role? 4) What opportunities are there for professional development?")
        );

        response.put("questions", questions);
        response.put("total", questions.size());
        return ResponseEntity.ok(response);
    }

    private Map<String, String> createQuestion(String question, String answer) {
        Map<String, String> qa = new HashMap<>();
        qa.put("question", question);
        qa.put("answer", answer);
        return qa;
    }
}
