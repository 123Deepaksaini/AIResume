package com.resume.backend;

public class ResumeRequest {
    private String userDescription;

    public ResumeRequest() {}

    public ResumeRequest(String userDescription) {
        this.userDescription = userDescription;
    }

    public String userDescription() {
        return userDescription;
    }

    public void setUserDescription(String userDescription) {
        this.userDescription = userDescription;
    }
}
