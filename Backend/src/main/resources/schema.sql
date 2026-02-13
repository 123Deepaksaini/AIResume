-- Create resumes table
CREATE TABLE IF NOT EXISTS resumes (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255),
    job_description TEXT,
    full_name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(50),
    location VARCHAR(255),
    summary TEXT,
    skill_1 VARCHAR(255),
    skill_2 VARCHAR(255),
    skill_3 VARCHAR(255),
    skill_4 VARCHAR(255),
    skill_5 VARCHAR(255),
    skill_6 VARCHAR(255),
    skill_7 VARCHAR(255),
    skill_8 VARCHAR(255),
    skill_9 VARCHAR(255),
    skill_10 VARCHAR(255),
    company_1 VARCHAR(255),
    position_1 VARCHAR(255),
    duration_1 VARCHAR(100),
    company_2 VARCHAR(255),
    position_2 VARCHAR(255),
    duration_2 VARCHAR(100),
    degree_1 VARCHAR(255),
    university_1 VARCHAR(255),
    graduation_year_1 VARCHAR(50),
    project_1 TEXT,
    project_2 TEXT,
    cover_letter TEXT,
    created_at DATETIME,
    updated_at DATETIME
);

-- Create auth users table used by login/signup/google auth flow
CREATE TABLE IF NOT EXISTS auth_users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password_hash VARCHAR(255),
    provider VARCHAR(30) NOT NULL,
    avatar_url VARCHAR(500),
    reset_code VARCHAR(20),
    reset_code_expiry DATETIME,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    CONSTRAINT uk_auth_users_email UNIQUE (email)
);

-- Create index for faster resume lookup by user email
ALTER TABLE resumes ADD INDEX idx_user_email (user_email);
