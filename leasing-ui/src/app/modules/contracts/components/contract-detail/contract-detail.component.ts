import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {of, switchMap} from 'rxjs';

import {DialogMetadata} from '../../../shared/models/dialog-metadata';
import {ButtonClickActionEnum} from '../../../shared/models/button-click-action.enum';
import {ContractDetailWithIds} from '../../../shared/models/contract-detail-with-ids';
import {VehicleApiService} from '../../../vehicles/services/vehicle-api.service';
import {VehicleDataWithId} from '../../../shared/models/vehicle.model';
import {CustomerApiService} from '../../../customers/services/customer-api.service';
import {CustomerWithContracts} from '../../../shared/models/customer.model';

@Component({
  selector: 'app-contract-detail',
  templateUrl: './contract-detail.component.html',
  styleUrls: ['./contract-detail.component.scss']
})
export class ContractDetailComponent implements OnInit {

  public readonly ButtonClickActionEnum = ButtonClickActionEnum;
  public formGroup: FormGroup = this.setFormGroup(this.data.contractData);

  public vehicles: VehicleDataWithId[] = [];
  public customers: CustomerWithContracts[] = [];
  public selectedVehicle: VehicleDataWithId | undefined;
  public selectedCustomer: CustomerWithContracts | undefined;

  public get selectedVehicleData(): VehicleDataWithId {
    return this.selectedVehicle ? this.selectedVehicle : {
      id: 0,
      brand: '',
      model: '',
      modelYear: '',
      vin: '',
      price: 0.0
    };
  }

  public get selectedCustomerData(): CustomerWithContracts {
    return this.selectedCustomer ? this.selectedCustomer : {
      id: 0,
      firstname: '',
      lastname: '',
      birthdate: '',
      contracts: []
    };
  }

  constructor(private fb: FormBuilder,
              private vehicleApiService: VehicleApiService,
              private customerApiService: CustomerApiService,
              private dialogRef: MatDialogRef<ContractDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { contractData: ContractDetailWithIds, metadata: DialogMetadata }) {
  }

  private setFormGroup(contractData: ContractDetailWithIds): FormGroup {
    if (!contractData) {
      contractData = {
        contractId: 0, vehicleId: 0, customerId: 0, contractNumber: 0,
        customerFullName: '', vehicle: '', vin: '', vehiclePrice: 0.0, monthlyRate: 0.0
      };
      this.data.contractData = contractData;
    }

    return this.fb.group({
      contractNumber: new FormControl(contractData.contractNumber === 0 ? '' : contractData.contractNumber, Validators.required),
      monthlyRate: new FormControl(contractData.monthlyRate === 0 ? '' : contractData.monthlyRate, Validators.required),
      customerFullName: new FormControl(contractData.customerFullName, Validators.required),
      vehicle: new FormControl(contractData.vehicle, Validators.required),
      vin: new FormControl(contractData.vin),
      vehiclePrice: new FormControl(contractData.vehiclePrice, Validators.required),
    });
  }

  ngOnInit(): void {
    this.vehicleApiService.getAllVehiclesNotInContract()
      .pipe(switchMap(vehicles => {
        this.vehicles = vehicles;
        if (this.data.contractData.contractId) {
          return this.vehicleApiService.getVehicleById(this.data.contractData.vehicleId);
        }
        return of(null);
      }))
      .subscribe(currentVehicle => {
        if (currentVehicle) {
          this.vehicles.push(currentVehicle);
          this.selectedVehicle = currentVehicle;
          this.data.contractData.vehicleId = currentVehicle.id;
        }
      });
    this.customerApiService.getAllCustomers().subscribe(customers => {
      this.customers = customers;
      this.selectedCustomer = customers.find(c => c.id === this.data.contractData.customerId);
    });
  }

  onClick(action: ButtonClickActionEnum) {
    switch (action) {
      case ButtonClickActionEnum.SUBMIT:
        if (this.formGroup) {
          this.data.contractData.contractNumber = this.formGroup.get('contractNumber')?.value;
          this.data.contractData.monthlyRate = this.formGroup.get('monthlyRate')?.value;
          this.data.contractData.vehicleId = this.selectedVehicleData.id;
          this.data.contractData.customerId = this.selectedCustomerData.id;
        }
        this.dialogRef.close(this.data.contractData);
        break;
      case ButtonClickActionEnum.CANCEL:
        this.dialogRef.close();
        break;
    }
  }

  onVehicleChange(vehicleId: number): void {
    this.selectedVehicle = this.vehicles.find(v => v.id === vehicleId);
  }

  onCustomerChange(customerId: number): void {
    this.selectedCustomer = this.customers.find(v => v.id === customerId);
  }
}
