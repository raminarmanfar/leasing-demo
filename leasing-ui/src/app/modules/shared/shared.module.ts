import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {TableComponent} from './components/table/table.component';
import {MaterialsModule} from './materials/materials.module';
import {CommonService} from './common.service';
import { CustomerDetailComponent } from './components/customer-detail/customer-detail.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { VehicleDetailComponent } from './components/vehicle-detail/vehicle-detail.component';



@NgModule({
  declarations: [TableComponent, CustomerDetailComponent, ConfirmationDialogComponent, VehicleDetailComponent],
  imports: [
    CommonModule,
    MaterialsModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports: [TableComponent, MaterialsModule],
  providers: [CommonService]
})
export class SharedModule { }
