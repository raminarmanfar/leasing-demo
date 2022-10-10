package com.armanfar.leasing.customer;

import com.armanfar.leasing.RequestStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/customers")
public class CustomerController {
    @Autowired
    private CustomerService customerService;

    @GetMapping()
    @ResponseBody
    public Iterable<Customer> findAll() {
        return customerService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Customer findById(@PathVariable Long id) {
        return customerService.findById(id);
    }

    @PostMapping()
    @ResponseBody
    public Iterable<Customer> addCustomer(@RequestBody Customer customer) {
        return customerService.addCustomer(customer);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteCustomerById(@PathVariable Long id) {
        return customerService.deleteCustomerById(id);
    }

    @GetMapping("/deletable/{id}")
    @ResponseBody
    public RequestStatus isDeletable(@PathVariable Long id) {
        return customerService.isDeletable(id);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public Iterable<Customer> updateCustomerById(@PathVariable Long id, @RequestBody Customer customer) {
        return customerService.updateCustomerById(id, customer);
    }
}
