package com.aritra.interviewpro.exception;

public class InvalidStatusTransitionException
        extends RuntimeException {

    public InvalidStatusTransitionException(
            String message
    ) {
        super(message);
    }
}