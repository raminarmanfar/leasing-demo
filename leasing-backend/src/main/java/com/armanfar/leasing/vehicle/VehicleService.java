package com.armanfar.leasing.vehicle;

import com.armanfar.leasing.RequestStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

@Service
public class VehicleService {
    @Autowired
    private VehicleRepository vehicleRepository;

    public Iterable<Vehicle> findAll() {
        return vehicleRepository.findAll();
    }

    public Vehicle findById(Long id) {
        return vehicleRepository.findById(id).orElse(null);
    }

    public Iterable<Vehicle> findAllVehiclesNotInContract() {
        return vehicleRepository.findAllVehiclesNotInContract();
    }

    public Iterable<Vehicle> addVehicle(Vehicle vehicle) {
        vehicleRepository.save(vehicle);
        return findAll();
    }

    public ResponseEntity<Object> deleteVehicleById(Long id) {
        if (vehicleRepository.existsById(id)) {
            vehicleRepository.deleteById(id);
            return ResponseEntity.ok(id);
        }
        return ResponseEntity.notFound().build();
    }

    public RequestStatus isDeletable(Long id) {
        boolean result = vehicleRepository.isInUse(id);
        return result ? new RequestStatus("Vehicle Data is Already in use in a contract.", true) : new RequestStatus("Vehicle is not used in any contract.", false);
    }

    public Iterable<Vehicle> updateVehicleById(Long id, Vehicle updatedVehicle) {
        return vehicleRepository.findById(id).map(currentVehicle -> {
            currentVehicle.setBrand(updatedVehicle.getBrand());
            currentVehicle.setModel(updatedVehicle.getModel());
            currentVehicle.setModelYear(updatedVehicle.getModelYear());
            currentVehicle.setVin(updatedVehicle.getVin());
            currentVehicle.setPrice(updatedVehicle.getPrice());
            vehicleRepository.save(currentVehicle);
            return findAll();
        }).orElseGet(() -> addVehicle(updatedVehicle));
    }
}
