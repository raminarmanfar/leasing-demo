package com.armanfar.leasing.customer;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CustomerRepository extends CrudRepository<Customer, Long> {
    @Query(value = "select case when (count (c) > 0) then false else true end from Contract c where c.customer.id = ?1")
    Boolean isDeletable(Long id);
}
