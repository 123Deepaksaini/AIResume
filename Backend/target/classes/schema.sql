-- Create database
CREATE DATABASE IF NOT EXISTS resume_ai;
USE resume_ai;

-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255),
    job_description TEXT,
    generated_resume TEXT,
    cover_letter TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Create index for faster queries
CREATE INDEX idx_user_email ON resumes(user_email);
