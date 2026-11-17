package com.example.ppmtool.exceptions;

public class SprintIdExceptionResponse {
    private String id;

    public SprintIdExceptionResponse(String message) {
        this.id = message;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }
}
