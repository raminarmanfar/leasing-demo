package com.armanfar.leasing.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class ContractExceptionController {
    @ExceptionHandler(value = {ContractNumberIsNotUniqueException.class, VehicleIsInUseException.class})
    public ResponseEntity<Object> exception(ContractNumberIsNotUniqueException exception) {
        return new ResponseEntity<>(exception.getMessage(), HttpStatus.BAD_REQUEST);
    }
}
