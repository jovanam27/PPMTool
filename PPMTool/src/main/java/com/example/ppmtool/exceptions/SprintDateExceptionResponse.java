package com.example.ppmtool.exceptions;

public class SprintDateExceptionResponse {
    private String endDate;


    public SprintDateExceptionResponse(String message) {
        this.endDate = message;
    }

    public String getEndDate() {
        return endDate;
    }

    public void setEndDate(String endDate) {
        this.endDate = endDate;
    }
}
