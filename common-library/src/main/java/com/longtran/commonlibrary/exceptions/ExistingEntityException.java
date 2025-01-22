package com.longtran.commonlibrary.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(value = HttpStatus.CONFLICT)
public class ExistingEntityException extends RuntimeException {
    public ExistingEntityException(String message) {
        super(message);
    }
}
