package com.example.ppmtool.exceptions;

public class SprintStatusExceptionResponse {
    private String status;

    public SprintStatusExceptionResponse(String message) {
        this.status = message;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
