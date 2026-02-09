package com.resume.backend;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.TestPropertySource;

@SpringBootTest
@TestPropertySource(locations = "classpath:application.properties")
class ResumeAiBackendApplicationTests {

	@Test
	void contextLoads() {
		// Test skipped for deployment - requires database connection
	}
}
