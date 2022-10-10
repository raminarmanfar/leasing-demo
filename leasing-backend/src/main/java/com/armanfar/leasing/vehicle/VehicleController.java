package com.armanfar.leasing.vehicle;

import com.armanfar.leasing.RequestStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping("/vehicles")
public class VehicleController {
    @Autowired
    private VehicleService vehicleService;

    @GetMapping()
    @ResponseBody
    public Iterable<Vehicle> findAll() {
        return vehicleService.findAll();
    }

    @GetMapping("/{id}")
    @ResponseBody
    public Vehicle findById(@PathVariable Long id) {
        return vehicleService.findById(id);
    }

    @GetMapping("/not-in-contract")
    @ResponseBody
    public Iterable<Vehicle> findAllVehiclesNotInContract() {
        return vehicleService.findAllVehiclesNotInContract();
    }

    @PostMapping()
    @ResponseBody
    public Iterable<Vehicle> addVehicle(@RequestBody Vehicle vehicle) {
        return vehicleService.addVehicle(vehicle);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteVehicleById(@PathVariable Long id) {
        return vehicleService.deleteVehicleById(id);
    }

    @GetMapping("/deletable/{id}")
    @ResponseBody
    public RequestStatus isDeletable(@PathVariable Long id) {
        return vehicleService.isDeletable(id);
    }

    @PutMapping("/{id}")
    @ResponseBody
    public Iterable<Vehicle> updateCustomer(@PathVariable Long id, @RequestBody Vehicle vehicle) {
        return vehicleService.updateVehicleById(id, vehicle);
    }
}
