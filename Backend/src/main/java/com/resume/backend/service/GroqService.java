package com.resume.backend.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.*;

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

    @SuppressWarnings("unchecked")
    public Map<String, Object> generateResume(String userDescription) {

        if (apiKey == null || apiKey.trim().isEmpty()) {
            throw new IllegalStateException("GROQ_API_KEY not configured");
        }

        String prompt =
                "You are a professional resume writer. Create a detailed resume from the following user description.\n" +
                "Return ONLY valid JSON. No markdown. No explanation.\n\n" +
                "{\n" +
                "  \"meta\": \"Resume generated for year 2025\",\n" +
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

        try {
            // Request body
            Map<String, Object> message = new HashMap<>();
            message.put("role", "user");
            message.put("content", prompt);

            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("model", "llama-3.3-70b-versatile");
            requestBody.put("messages", Collections.singletonList(message));
            requestBody.put("temperature", 0.7);
            requestBody.put("max_tokens", 2048);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("Authorization", "Bearer " + apiKey);
            headers.set("User-Agent", "curl/8.16.0");

            HttpEntity<String> entity =
                    new HttpEntity<>(objectMapper.writeValueAsString(requestBody), headers);

            ResponseEntity<String> apiResponse =
                    restTemplate.postForEntity(
                            GROQ_API_URL,
                            entity,
                            String.class
                    );

            if (!apiResponse.getStatusCode().is2xxSuccessful()) {
                String errorBody = apiResponse.getBody();
                log.error("Groq API error: {} - {}", apiResponse.getStatusCode(), errorBody);
                throw new RuntimeException("Groq API error: " + apiResponse.getStatusCode() + " - " + errorBody);
            }

            Map<String, Object> apiResult =
                    objectMapper.readValue(apiResponse.getBody(), Map.class);

            List<Map<String, Object>> choices = (List<Map<String, Object>>) apiResult.get("choices");
            Map<String, Object> firstChoice = choices.get(0);
            Map<String, Object> responseMessage = (Map<String, Object>) firstChoice.get("message");
            String aiText = (String) responseMessage.get("content");

            aiText = aiText.replaceAll("```json", "").replaceAll("```", "").trim();

            Map<String, Object> aiJson = objectMapper.readValue(aiText, Map.class);

            Map<String, Object> response = new HashMap<>();
            response.put("meta", aiJson.get("meta"));
            response.put("data", aiJson.get("data"));

            log.info("=== GROQ API CALL SUCCESS ===");
            return response;

        } catch (Exception e) {
            log.error("Groq API failed", e);
            throw new RuntimeException("Resume generation failed: " + e.getMessage());
        }
    }
}
