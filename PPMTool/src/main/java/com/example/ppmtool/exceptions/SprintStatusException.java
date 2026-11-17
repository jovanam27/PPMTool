package com.example.ppmtool.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(HttpStatus.BAD_REQUEST)
public class SprintStatusException extends RuntimeException {
    public SprintStatusException(String message) {
        super(message);
    }
}
