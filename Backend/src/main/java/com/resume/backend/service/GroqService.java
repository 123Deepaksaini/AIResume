package com.resume.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GroqService {

    private static final Logger log = LoggerFactory.getLogger(GroqService.class);

    @Value("${GROQ_API_KEY}")
    private String apiKey;

    private static final String GROQ_API_URL =
            "https://api.groq.com/openai/v1/chat/completions";

    private final RestTemplate restTemplate;
    private final ObjectMapper objectMapper;

    public GroqService(RestTemplate restTemplate, ObjectMapper objectMapper) {
        this.restTemplate = restTemplate;
        this.objectMapper = objectMapper;
    }

    public Map<String, Object> generateResume(String userDescription) {
        ensureApiKey();

        String prompt =
                "You are a professional resume writer. Create a detailed resume from the following user description.\n" +
                "Return ONLY valid JSON. No markdown. No explanation.\n\n" +
                "{\n" +
                "  \"meta\": \"Resume generated\",\n" +
                "  \"data\": {\n" +
                "    \"personalInformation\": {\n" +
                "      \"fullName\": \"Name\",\n" +
                "      \"email\": \"email@example.com\",\n" +
                "      \"phoneNumber\": \"Phone\",\n" +
                "      \"location\": \"City, Country\",\n" +
                "      \"linkedIn\": null,\n" +
                "      \"gitHub\": null,\n" +
                "      \"portfolio\": null\n" +
                "    },\n" +
                "    \"summary\": \"Professional summary\",\n" +
                "    \"skills\": [{\"title\": \"Skill\", \"level\": \"Beginner/Intermediate/Expert\"}],\n" +
                "    \"experience\": [],\n" +
                "    \"education\": [],\n" +
                "    \"projects\": [],\n" +
                "    \"certifications\": [],\n" +
                "    \"languages\": [],\n" +
                "    \"interests\": [],\n" +
                "    \"achievements\": []\n" +
                "  }\n" +
                "}\n\n" +
                "User Description: " + userDescription;

        Map<String, Object> aiJson = chatCompletion(prompt, 0.7, 2048);
        Map<String, Object> response = new HashMap<>();
        response.put("meta", aiJson.get("meta"));
        response.put("data", aiJson.get("data"));
        return response;
    }

    public Map<String, Object> generateInterviewQuestions(List<String> skills) {
        ensureApiKey();

        List<String> safeSkills = (skills == null) ? Collections.emptyList() : skills;
        String skillsText = safeSkills.isEmpty() ? "general software engineering" : String.join(", ", safeSkills);

        String prompt = """
                You are an expert technical interview coach.
                Generate interview questions and strong sample answers tailored to these skills: %s.

                Return ONLY valid JSON in this exact shape:
                {
                  "meta": "Interview prep generated",
                  "questions": [
                    {
                      "question": "...",
                      "answer": "...",
                      "category": "technical|behavioral|problem-solving"
                    }
                  ]
                }

                Requirements:
                - Return 10 questions.
                - Balance technical and behavioral questions.
                - Keep answers practical, concise, and interview-ready.
                - No markdown. No extra text.
                """.formatted(skillsText);

        Map<String, Object> aiJson = chatCompletion(prompt, 0.6, 2200);

        Object questionsObj = aiJson.get("questions");
        List<Map<String, String>> normalizedQuestions = new ArrayList<>();
        if (questionsObj instanceof List<?>) {
            for (Object item : (List<?>) questionsObj) {
                if (item instanceof Map<?, ?> mapItem) {
                    String question = stringify(mapItem.get("question"));
                    String answer = stringify(mapItem.get("answer"));
                    String category = stringify(mapItem.get("category"));

                    if (!question.isBlank() && !answer.isBlank()) {
                        Map<String, String> row = new HashMap<>();
                        row.put("question", question);
                        row.put("answer", answer);
                        row.put("category", category.isBlank() ? "technical" : category);
                        normalizedQuestions.add(row);
                    }
                }
            }
        }

        Map<String, Object> response = new HashMap<>();
        response.put("meta", aiJson.getOrDefault("meta", "Interview prep generated"));
        response.put("skills", safeSkills);
        response.put("questions", normalizedQuestions);
        response.put("total", normalizedQuestions.size());
        return response;
    }

    @SuppressWarnings("unchecked")
    private Map<String, Object> chatCompletion(String prompt, double temperature, int maxTokens) {
        try {
            Map<String, Object> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "llama-3.3-70b-versatile");
            requestBody.put("messages", Collections.singletonList(message));
            requestBody.put("temperature", temperature);
            requestBody.put("max_tokens", maxTokens);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);
            headers.set("User-Agent", "resume-ai-app/1.0");

            HttpEntity<String> entity =
                    new HttpEntity<>(objectMapper.writeValueAsString(requestBody), headers);

            ResponseEntity<String> apiResponse =
                    restTemplate.postForEntity(GROQ_API_URL, entity, String.class);

            if (!apiResponse.getStatusCode().is2xxSuccessful()) {
                String errorBody = apiResponse.getBody();
                log.error("Groq API error: {} - {}", apiResponse.getStatusCode(), errorBody);
                throw new RuntimeException("Groq API error: " + apiResponse.getStatusCode() + " - " + errorBody);
            }

            Map<String, Object> apiResult = objectMapper.readValue(apiResponse.getBody(), Map.class);
            List<Map<String, Object>> choices = (List<Map<String, Object>>) apiResult.get("choices");

            if (choices == null || choices.isEmpty()) {
                throw new RuntimeException("Groq API returned no choices");
            }

            Map<String, Object> firstChoice = choices.get(0);
            Map<String, Object> responseMessage = (Map<String, Object>) firstChoice.get("message");
            String aiText = (String) responseMessage.get("content");

            String cleaned = aiText.replace("```json", "").replace("```", "").trim();
            return objectMapper.readValue(cleaned, Map.class);

        } catch (Exception e) {
            log.error("Groq API failed", e);
            throw new RuntimeException("Groq generation failed: " + e.getMessage());
        }
    }

    private String stringify(Object value) {
        return value == null ? "" : String.valueOf(value).trim();
    }

    private void ensureApiKey() {
        if (apiKey == null || apiKey.trim().isEmpty()) {
            throw new IllegalStateException("GROQ_API_KEY not configured");
        }
    }
}
