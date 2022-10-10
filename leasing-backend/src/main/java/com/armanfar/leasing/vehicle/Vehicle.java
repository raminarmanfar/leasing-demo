package com.armanfar.leasing.vehicle;

import com.armanfar.leasing.contract.Contract;
import com.fasterxml.jackson.annotation.JsonBackReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(schema = "leasing_db",name = "vehicle")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Vehicle {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    private String brand;
    private String model;

    @Column(name = "model_year")
    private String modelYear;
    private String vin;
    private double price;

    @OneToOne(mappedBy = "vehicle", cascade = CascadeType.DETACH)
    @JsonBackReference
    private Contract contract;
}
