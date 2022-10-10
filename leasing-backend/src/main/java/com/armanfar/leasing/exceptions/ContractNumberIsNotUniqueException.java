package com.armanfar.leasing.exceptions;

import java.io.Serial;

public class ContractNumberIsNotUniqueException extends RuntimeException {
    @Serial
    private static final long serialVersionUID = 1L;

    public ContractNumberIsNotUniqueException(String message) {
        super(message);
    }
}
