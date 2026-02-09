package com.resume.backend.repository;

import com.resume.backend.entity.Resume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ResumeRepository extends JpaRepository<Resume, Long> {
    
    List<Resume> findByUserEmail(String userEmail);
    
    List<Resume> findByUserEmailOrderByCreatedAtDesc(String userEmail);
}
