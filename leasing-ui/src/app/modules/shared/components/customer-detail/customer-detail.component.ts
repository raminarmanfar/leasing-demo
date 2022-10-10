import {Component, Inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ButtonClickActionEnum} from '../../models/button-click-action.enum';
import {DialogMetadata} from '../../models/dialog-metadata';
import {CustomerMinimalData} from '../../models/customer.model';

@Component({
  selector: 'app-customer-detail',
  templateUrl: './customer-detail.component.html',
  styleUrls: ['./customer-detail.component.scss']
})
export class CustomerDetailComponent implements OnInit {
  public readonly ButtonClickActionEnum = ButtonClickActionEnum;
  public formGroup: FormGroup | undefined;

  constructor(private dialogRef: MatDialogRef<CustomerDetailComponent>,
              @Inject(MAT_DIALOG_DATA) public data: {customerData: CustomerMinimalData, metadata: DialogMetadata}) {
  }

  ngOnInit(): void {
    const customerData: CustomerMinimalData = {
      firstname: this.data.customerData ? this.data.customerData.firstname : '',
      lastname: this.data.customerData ? this.data.customerData.lastname : '',
      birthdate: this.data.customerData ? this.data.customerData.birthdate : ''
    };

    this.formGroup = new FormGroup({
      firstname: new FormControl(customerData.firstname, Validators.required),
      lastname: new FormControl(customerData.lastname, Validators.required),
      birthdate: new FormControl(customerData.birthdate, Validators.required),
    });
  }

  onClick(action: ButtonClickActionEnum) {
    switch (action) {
      case ButtonClickActionEnum.SUBMIT:
        if (this.formGroup) {
          const customerData: CustomerMinimalData = {
            firstname: this.formGroup.controls['firstname'].value,
            lastname: this.formGroup.controls['lastname'].value,
            birthdate: this.formGroup.controls['birthdate'].value,
          };
          this.dialogRef.close(customerData);
        }
        break;
      case ButtonClickActionEnum.CANCEL:
        this.dialogRef.close();
        break;
    }
  }
}
