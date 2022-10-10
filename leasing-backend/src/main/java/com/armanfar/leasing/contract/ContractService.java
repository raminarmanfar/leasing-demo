package com.armanfar.leasing.contract;

import com.armanfar.leasing.customer.Customer;
import com.armanfar.leasing.customer.CustomerRepository;
import com.armanfar.leasing.exceptions.ContractNumberIsNotUniqueException;
import com.armanfar.leasing.exceptions.VehicleIsInUseException;
import com.armanfar.leasing.vehicle.Vehicle;
import com.armanfar.leasing.vehicle.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.text.MessageFormat;

@Service
public class ContractService {
    @Autowired
    private ContractRepository contractRepository;

    @Autowired
    private CustomerRepository customerRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    private Customer getCustomerById(Long customerId) {
        return customerRepository.findById(customerId).orElseThrow(() -> new RuntimeException("Customer data not found!"));
    }

    private Vehicle getVehicleById(Long vehicleId) {
        return vehicleRepository.findById(vehicleId).orElseThrow(() -> new RuntimeException("Vehicle data not found!"));
    }

    public Iterable<Contract> findAll() {
        return contractRepository.findAll();
    }

    public Iterable<ContractsDetails> findAllContractsWithDetails() {
        return contractRepository.findAllContractsWithDetails();
    }

    public Contract findById(Long id) {
        return contractRepository.findById(id).orElse(null);
    }

    public Iterable<ContractsDetails> addContract(Long customerId, Long vehicleId, Contract newContract) {
        if (vehicleRepository.isInUse(vehicleId)) {
            throw new VehicleIsInUseException("Selected vehicle is already used in another contract!");
        }
        Contract contract = contractRepository.findContractByContractNumber(newContract.getContractNumber());
        if (contract == null) {
            Customer customer = getCustomerById(customerId);
            Vehicle vehicle = getVehicleById(vehicleId);

            customer.getContracts().add(newContract);
            customer.setContracts(customer.getContracts());
            vehicle.setContract(newContract);

            newContract.setCustomer(customer);
            newContract.setVehicle(vehicle);

            contractRepository.save(newContract);
            return findAllContractsWithDetails();
        }
        String errorMessage = MessageFormat
                .format("Contract number ({0}) has already been exists.", contract.getContractNumber().toString());
        throw new ContractNumberIsNotUniqueException(errorMessage);
    }

    public Iterable<ContractsDetails> updateContractById(Long id, Long customerId, Long vehicleId, Contract updatedContract) {
        Contract contract = contractRepository.findContractByContractNumber(updatedContract.getContractNumber());
        if (contract == null || contract.getId().equals(id)) {
            if (vehicleRepository.isInUse(vehicleId) && contract.getVehicle() != null && !contract.getVehicle().getId().equals(vehicleId)) {
                throw new VehicleIsInUseException("Selected vehicle is already used in another contract!");
            }

            return contractRepository.findById(id).map(currentContract -> {
                Customer customer = getCustomerById(customerId);
                Vehicle vehicle = getVehicleById(vehicleId);

                currentContract.setCustomer(customer);
                currentContract.setVehicle(vehicle);
                currentContract.setContractNumber(updatedContract.getContractNumber());
                currentContract.setMonthlyRate(updatedContract.getMonthlyRate());

                contractRepository.save(currentContract);
                return findAllContractsWithDetails();
            }).orElseThrow(() -> new RuntimeException("Contract data not found!"));
        }
        String errorMessage = MessageFormat
                .format("Contract number ({0}) has already been exists!", contract.getContractNumber().toString());
        throw new ContractNumberIsNotUniqueException(errorMessage);
    }

    public ResponseEntity<Object> deleteContractById(Long id) {
        if (contractRepository.existsById(id)) {
            contractRepository.deleteById(id);
            return ResponseEntity.ok(id);
        }
        return ResponseEntity.notFound().build();
    }
}
