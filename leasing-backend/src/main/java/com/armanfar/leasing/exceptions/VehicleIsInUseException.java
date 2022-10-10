package com.armanfar.leasing.exceptions;

import java.io.Serial;

public class VehicleIsInUseException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public VehicleIsInUseException(String message) {
        super(message);
    }
}
