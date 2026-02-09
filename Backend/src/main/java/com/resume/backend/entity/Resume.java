package com.resume.backend.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "resumes")
public class Resume {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "user_email", length = 255)
    @JsonProperty("userEmail")
    private String userEmail;
    
    @Column(name = "job_description", columnDefinition = "TEXT")
    @JsonProperty("jobDescription")
    private String jobDescription;
    
    // Personal Information
    @Column(name = "full_name", length = 255)
    @JsonProperty("fullName")
    private String fullName;
    
    @Column(name = "email", length = 255)
    @JsonProperty("email")
    private String email;
    
    @Column(name = "phone", length = 50)
    @JsonProperty("phone")
    private String phone;
    
    @Column(name = "location", length = 255)
    @JsonProperty("location")
    private String location;
    
    @Column(name = "summary", columnDefinition = "TEXT")
    @JsonProperty("summary")
    private String summary;
    
    // Skills - separate columns
    @Column(name = "skill_1", length = 255)
    @JsonProperty("skill1")
    private String skill1;
    
    @Column(name = "skill_2", length = 255)
    @JsonProperty("skill2")
    private String skill2;
    
    @Column(name = "skill_3", length = 255)
    @JsonProperty("skill3")
    private String skill3;
    
    @Column(name = "skill_4", length = 255)
    @JsonProperty("skill4")
    private String skill4;
    
    @Column(name = "skill_5", length = 255)
    @JsonProperty("skill5")
    private String skill5;
    
    @Column(name = "skill_6", length = 255)
    @JsonProperty("skill6")
    private String skill6;
    
    @Column(name = "skill_7", length = 255)
    @JsonProperty("skill7")
    private String skill7;
    
    @Column(name = "skill_8", length = 255)
    @JsonProperty("skill8")
    private String skill8;
    
    @Column(name = "skill_9", length = 255)
    @JsonProperty("skill9")
    private String skill9;
    
    @Column(name = "skill_10", length = 255)
    @JsonProperty("skill10")
    private String skill10;
    
    // Experience
    @Column(name = "company_1", length = 255)
    @JsonProperty("company1")
    private String company1;
    
    @Column(name = "position_1", length = 255)
    @JsonProperty("position1")
    private String position1;
    
    @Column(name = "duration_1", length = 100)
    @JsonProperty("duration1")
    private String duration1;
    
    @Column(name = "company_2", length = 255)
    @JsonProperty("company2")
    private String company2;
    
    @Column(name = "position_2", length = 255)
    @JsonProperty("position2")
    private String position2;
    
    @Column(name = "duration_2", length = 100)
    @JsonProperty("duration2")
    private String duration2;
    
    // Education
    @Column(name = "degree_1", length = 255)
    @JsonProperty("degree1")
    private String degree1;
    
    @Column(name = "university_1", length = 255)
    @JsonProperty("university1")
    private String university1;
    
    @Column(name = "graduation_year_1", length = 50)
    @JsonProperty("graduationYear1")
    private String graduationYear1;
    
    // Projects
    @Column(name = "project_1", columnDefinition = "TEXT")
    @JsonProperty("project1")
    private String project1;
    
    @Column(name = "project_2", columnDefinition = "TEXT")
    @JsonProperty("project2")
    private String project2;
    
    @Column(name = "cover_letter", columnDefinition = "TEXT")
    @JsonProperty("coverLetter")
    private String coverLetter;
    
    @Column(name = "created_at")
    private LocalDateTime createdAt;
    
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
    
    public Resume() {
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
    
    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    
    public String getUserEmail() { return userEmail; }
    public void setUserEmail(String userEmail) { this.userEmail = userEmail; }
    
    public String getJobDescription() { return jobDescription; }
    public void setJobDescription(String jobDescription) { this.jobDescription = jobDescription; }
    
    public String getFullName() { return fullName; }
    public void setFullName(String fullName) { this.fullName = fullName; }
    
    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }
    
    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }
    
    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }
    
    public String getSummary() { return summary; }
    public void setSummary(String summary) { this.summary = summary; }
    
    public String getSkill1() { return skill1; }
    public void setSkill1(String skill1) { this.skill1 = skill1; }
    
    public String getSkill2() { return skill2; }
    public void setSkill2(String skill2) { this.skill2 = skill2; }
    
    public String getSkill3() { return skill3; }
    public void setSkill3(String skill3) { this.skill3 = skill3; }
    
    public String getSkill4() { return skill4; }
    public void setSkill4(String skill4) { this.skill4 = skill4; }
    
    public String getSkill5() { return skill5; }
    public void setSkill5(String skill5) { this.skill5 = skill5; }
    
    public String getSkill6() { return skill6; }
    public void setSkill6(String skill6) { this.skill6 = skill6; }
    
    public String getSkill7() { return skill7; }
    public void setSkill7(String skill7) { this.skill7 = skill7; }
    
    public String getSkill8() { return skill8; }
    public void setSkill8(String skill8) { this.skill8 = skill8; }
    
    public String getSkill9() { return skill9; }
    public void setSkill9(String skill9) { this.skill9 = skill9; }
    
    public String getSkill10() { return skill10; }
    public void setSkill10(String skill10) { this.skill10 = skill10; }
    
    public String getCompany1() { return company1; }
    public void setCompany1(String company1) { this.company1 = company1; }
    
    public String getPosition1() { return position1; }
    public void setPosition1(String position1) { this.position1 = position1; }
    
    public String getDuration1() { return duration1; }
    public void setDuration1(String duration1) { this.duration1 = duration1; }
    
    public String getCompany2() { return company2; }
    public void setCompany2(String company2) { this.company2 = company2; }
    
    public String getPosition2() { return position2; }
    public void setPosition2(String position2) { this.position2 = position2; }
    
    public String getDuration2() { return duration2; }
    public void setDuration2(String duration2) { this.duration2 = duration2; }
    
    public String getDegree1() { return degree1; }
    public void setDegree1(String degree1) { this.degree1 = degree1; }
    
    public String getUniversity1() { return university1; }
    public void setUniversity1(String university1) { this.university1 = university1; }
    
    public String getGraduationYear1() { return graduationYear1; }
    public void setGraduationYear1(String graduationYear1) { this.graduationYear1 = graduationYear1; }
    
    public String getProject1() { return project1; }
    public void setProject1(String project1) { this.project1 = project1; }
    
    public String getProject2() { return project2; }
    public void setProject2(String project2) { this.project2 = project2; }
    
    public String getCoverLetter() { return coverLetter; }
    public void setCoverLetter(String coverLetter) { this.coverLetter = coverLetter; }
    
    public LocalDateTime getCreatedAt() { return createdAt; }
    public void setCreatedAt(LocalDateTime createdAt) { this.createdAt = createdAt; }
    
    public LocalDateTime getUpdatedAt() { return updatedAt; }
    public void setUpdatedAt(LocalDateTime updatedAt) { this.updatedAt = updatedAt; }
    
    @PreUpdate
    public void preUpdate() {
        this.updatedAt = LocalDateTime.now();
    }
}
