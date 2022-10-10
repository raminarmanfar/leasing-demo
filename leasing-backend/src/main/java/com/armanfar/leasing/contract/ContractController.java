package com.armanfar.leasing.contract;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/contracts")
public class ContractController {
    @Autowired
    private ContractService contractService;

    @GetMapping()
    @ResponseBody
    public Iterable<Contract> findAll() {
        return contractService.findAll();
    }

    @GetMapping("/contracts-details")
    @ResponseBody
    public Iterable<ContractsDetails> findAllContractsWithDetails() {
        return contractService.findAllContractsWithDetails();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Contract findById(@PathVariable Long id) {
        return contractService.findById(id);
    }

    @PostMapping("/{customerId}/{vehicleId}")
    @ResponseBody
    public Iterable<ContractsDetails> addContract(@PathVariable Long customerId, @PathVariable Long vehicleId,
                                                  @RequestBody Contract contract) {
        return contractService.addContract(customerId, vehicleId, contract);
    }

    @PutMapping("/{id}/{customerId}/{vehicleId}")
    @ResponseBody
    public Iterable<ContractsDetails> updateById(@PathVariable Long id, @PathVariable Long customerId, @PathVariable Long vehicleId,
                                                 @RequestBody Contract contract) {
        return contractService.updateContractById(id, customerId, vehicleId, contract);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteById(@PathVariable Long id) {
        return contractService.deleteContractById(id);
    }
}
