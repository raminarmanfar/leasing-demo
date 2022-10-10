import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {of, switchMap} from 'rxjs';
import {VehicleData, VehicleDataWithId} from '../../../shared/models/vehicle.model';
import {FieldsMetadata} from '../../../shared/models/fields-metadata';
import {ButtonClickActionEnum} from '../../../shared/models/button-click-action.enum';
import {DialogMetadata} from '../../../shared/models/dialog-metadata';
import {
  ConfirmationDialogComponent
} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import {CommonService} from '../../../shared/common.service';
import {VehicleApiService} from '../../services/vehicle-api.service';
import {VehicleDetailComponent} from '../../../shared/components/vehicle-detail/vehicle-detail.component';

@Component({
  selector: 'app-vehicles-list',
  templateUrl: './vehicles-list.component.html',
  styleUrls: ['./vehicles-list.component.scss']
})
export class VehiclesListComponent implements OnInit {
  public readonly ButtonClickActionEnum = ButtonClickActionEnum;

  vehicles: VehicleDataWithId[] = [];
  fieldsMetadata: FieldsMetadata[] = [
    {isLink: false, isCurrency: false},
    {isLink: false, isCurrency: false},
    {isLink: false, isCurrency: false},
    {isLink: false, isCurrency: false},
    {isLink: false, isCurrency: false},
    {isLink: false, isCurrency: false},
  ];

  constructor(private vehicleApiService: VehicleApiService,
              private dialog: MatDialog,
              private commonService: CommonService) {
  }

  private openVehicleDialog(vehicleDataWithId?: VehicleDataWithId): void {
    const metadata: DialogMetadata = {
      title: vehicleDataWithId ? 'Edit Vehicle data' : 'Add new Vehicle',
      submitBtnCaption: 'Save',
      cancelBtnCaption: 'Cancel'
    };

    const dialogRef = this.dialog.open(VehicleDetailComponent, {
      width: '450px', data: {vehicleData: vehicleDataWithId, metadata},
    });

    dialogRef.afterClosed().pipe(
      switchMap((vehicleData: VehicleData) => {
        if (vehicleData) {
          if (vehicleDataWithId) {
            this.commonService.showSnakeBar('Update vehicle done!', 'Update');
            return this.vehicleApiService.updateVehicle(vehicleDataWithId.id, vehicleData);
          }
          this.commonService.showSnakeBar('Add new vehicle done!', 'Add');
          return this.vehicleApiService.addNewVehicle(vehicleData)
        }
        this.commonService.showSnakeBar('Action is cancelled!', 'Cancel');
        return [];
      })
    ).subscribe(vehicles => {
      this.vehicles = vehicles;
    });
  }

  ngOnInit(): void {
    this.vehicleApiService.getAllVehicles().subscribe(vehicles => this.vehicles = vehicles);
  }

  onClick(action: ButtonClickActionEnum, vehicleDataWithId?: VehicleDataWithId): void {
    switch (action) {
      case ButtonClickActionEnum.ADD_NEW_VEHICLE:
        this.openVehicleDialog();
        break;
      case ButtonClickActionEnum.EDIT_VEHICLE:
        const selectedVehicleData = JSON.parse(JSON.stringify(vehicleDataWithId));
        this.openVehicleDialog(selectedVehicleData);
        break;
      case ButtonClickActionEnum.DELETE_VEHICLE:
        const data: DialogMetadata = {
          title: `Delete Vehicle (${vehicleDataWithId?.brand} ${vehicleDataWithId?.model}) data`,
          submitBtnCaption: 'Delete',
          cancelBtnCaption: 'Cancel'
        };

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {width: '600px', data});

        dialogRef.afterClosed().subscribe((action: ButtonClickActionEnum) => {
          switch (action) {
            case ButtonClickActionEnum.CANCEL:
              this.commonService.showSnakeBar('Delete vehicle cancelled!', 'Delete');
              break;
            case ButtonClickActionEnum.CONFIRM:
              if (vehicleDataWithId) {
                this.vehicleApiService.isVehicleDeletable(vehicleDataWithId.id).pipe(
                  switchMap(requestStatus => {
                    if (requestStatus.hasError) {
                      this.commonService.showSnakeBar(requestStatus.message, 'Unsuccessful');
                      return of(requestStatus);
                    }
                    this.commonService.showSnakeBar('Delete vehicle success!', 'Delete');
                    return this.vehicleApiService.deleteVehicle(vehicleDataWithId.id);
                  }),
                  switchMap(res => res === true ? of(null) : this.vehicleApiService.getAllVehicles())
                ).subscribe(vehiclesAfterDeletion => this.vehicles = vehiclesAfterDeletion ? vehiclesAfterDeletion : this.vehicles);
              }
              break;
          }
        });
        break;
    }
  }

}
