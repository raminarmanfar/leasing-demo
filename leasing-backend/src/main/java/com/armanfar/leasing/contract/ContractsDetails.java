package com.armanfar.leasing.contract;

import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class ContractsDetails {
    private Long contractId;
    private Long customerId;
    private Long vehicleId;
    private Long contractNumber;
    private String customerFullName;
    private String vehicle;
    private String vin;
    private double monthlyRate;
    private double vehiclePrice;
}
