package com.armanfar.leasing.contract;

import com.armanfar.leasing.customer.Customer;
import com.armanfar.leasing.vehicle.Vehicle;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(schema = "leasing_db",name = "leasing_contract")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class Contract {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "contract_number")
    private Long contractNumber;

    @Column(name = "monthly_rate")
    private double monthlyRate;

    @JsonBackReference
    @ManyToOne(cascade = CascadeType.DETACH)
    @JoinColumn(name = "customer_id", referencedColumnName = "id", nullable = false)
    private Customer customer;

    @JsonManagedReference
    @OneToOne(cascade = CascadeType.DETACH, optional = false)
    @JoinColumn(name = "vehicle_id", referencedColumnName = "id", nullable = false)
    private Vehicle vehicle;

}
