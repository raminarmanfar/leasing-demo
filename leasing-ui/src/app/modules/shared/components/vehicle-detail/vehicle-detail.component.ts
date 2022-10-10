import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DialogMetadata} from '../../models/dialog-metadata';
import {ButtonClickActionEnum} from '../../models/button-click-action.enum';
import {VehicleData} from '../../models/vehicle.model';
import {ConstantValues} from '../../constant-values';
import {CarBrandModel} from '../../models/car-brand-model';

@Component({
  selector: 'app-vehicle-detail',
  templateUrl: './vehicle-detail.component.html',
  styleUrls: ['./vehicle-detail.component.scss']
})
export class VehicleDetailComponent implements OnInit {
  public readonly ButtonClickActionEnum = ButtonClickActionEnum;
  public readonly carBrands: CarBrandModel[] = ConstantValues.carBrands;
  public readonly modelYears: string[] = Array.from({length: 1000}, (v, i) => (i + 1990).toString());

  public formGroup: FormGroup = this.setFormGroup(this.data.vehicleData);
  public selectedBrand: CarBrandModel = {brand: '', models: []};

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<VehicleDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { vehicleData: VehicleData, metadata: DialogMetadata }) {
  }

  private getSelectedBrandData(selectedBrandName: string): CarBrandModel {
    const selectedBrand = this.carBrands.find(c => c.brand === selectedBrandName);
    return selectedBrand ? selectedBrand : {brand: '', models: []};
  }

  private setFormGroup(vehicleData: VehicleData): FormGroup {
    if (!vehicleData) {
      vehicleData = {brand: '', model: '', modelYear: '', vin: '', price: 0.0};
      this.data.vehicleData = vehicleData;
    }

    return this.fb.group({
      brand: new FormControl(vehicleData.brand, Validators.required),
      model: new FormControl(vehicleData.model, Validators.required),
      modelYear: new FormControl(vehicleData.modelYear, Validators.required),
      vin: new FormControl(vehicleData.vin),
      price: new FormControl(vehicleData.price === 0 ? '' : vehicleData.price, Validators.required),
    });
  }

  ngOnInit(): void {
    if (this.data.vehicleData) {
      this.selectedBrand = this.getSelectedBrandData(this.data.vehicleData.brand);
    }
  }

  onClick(action: ButtonClickActionEnum) {
    switch (action) {
      case ButtonClickActionEnum.SUBMIT:
        if (this.formGroup) {
          this.data.vehicleData.vin = this.formGroup.get('vin')?.value;
          this.data.vehicleData.price = this.formGroup.get('price')?.value;
        }
        this.dialogRef.close(this.data.vehicleData);
        break;
      case ButtonClickActionEnum.CANCEL:
        this.dialogRef.close();
        break;
    }
  }

  setSelectedBrand(selectedBrandName: string): void {
    this.formGroup.get('model')?.setValue(null);
    this.selectedBrand = this.getSelectedBrandData(selectedBrandName);
  }
}
