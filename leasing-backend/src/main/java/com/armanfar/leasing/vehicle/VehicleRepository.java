package com.armanfar.leasing.vehicle;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface VehicleRepository extends CrudRepository<Vehicle, Long> {
    @Query(value = "select case when (count (c) > 0) then true else false end from Contract c where c.vehicle.id = ?1")
    Boolean isInUse(Long id);

    @Query(value = "select v from Vehicle v left join Contract c on c.vehicle = v where c is null")
    Iterable<Vehicle> findAllVehiclesNotInContract();
}
