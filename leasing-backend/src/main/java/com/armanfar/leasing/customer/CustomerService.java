package com.armanfar.leasing.customer;

import com.armanfar.leasing.RequestStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class CustomerService {
    @Autowired
    private CustomerRepository customerRepository;

    public Iterable<Customer> findAll() {
        return customerRepository.findAll();
    }

    public Customer findById(Long id) {
        return customerRepository.findById(id).orElse(null);
    }

    public Iterable<Customer> addCustomer(Customer customer) {
        customerRepository.save(customer);
        return findAll();
    }

    public ResponseEntity<Object> deleteCustomerById(Long id) {
        if (customerRepository.existsById(id)) {
            customerRepository.deleteById(id);
            return ResponseEntity.ok(id);
        }
        return ResponseEntity.notFound().build();
    }

    public RequestStatus isDeletable(Long id) {
        boolean result = customerRepository.isDeletable(id);
        return result ? new RequestStatus("Customer is not used in any contract.", false) : new RequestStatus("Customer Data is Already in use in a contract.", true);
    }

    public Iterable<Customer> updateCustomerById(Long id, Customer updatedCustomer) {
        return customerRepository.findById(id).map(currentCustomer -> {
            currentCustomer.setFirstname(updatedCustomer.getFirstname());
            currentCustomer.setLastname(updatedCustomer.getLastname());
            currentCustomer.setBirthdate(updatedCustomer.getBirthdate());
            customerRepository.save(currentCustomer);
            return findAll();
        }).orElseGet(() -> addCustomer(updatedCustomer));
    }
}
