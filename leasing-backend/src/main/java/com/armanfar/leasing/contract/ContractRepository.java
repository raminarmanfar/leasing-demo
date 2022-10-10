package com.armanfar.leasing.contract;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContractRepository extends CrudRepository<Contract, Long> {
    @Query(value = "select new com.armanfar.leasing.contract.ContractsDetails(con.id, c.id, con.vehicle.id, con.contractNumber, concat(c.firstname, ' ', c.lastname), concat(con.vehicle.brand, ' ', con.vehicle.model, ' (', con.vehicle.modelYear, ')'), con.vehicle.vin, con.monthlyRate, con.vehicle.price) from Customer c inner join c.contracts con")
    List<ContractsDetails> findAllContractsWithDetails();

    Contract findContractByContractNumber(Long contractNumber);
}
