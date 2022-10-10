import {Component, OnInit} from '@angular/core';
import {ContractsApiService} from '../../services/contracts-api.service';
import {ContractDetailWithoutIds} from '../../../shared/models/contract-detail-without-ids';
import {FieldsMetadata} from '../../../shared/models/fields-metadata';
import {ButtonClickActionEnum} from '../../../shared/models/button-click-action.enum';
import {MatDialog} from '@angular/material/dialog';
import {of, switchMap} from 'rxjs';

import {CustomerDetailComponent} from '../../../shared/components/customer-detail/customer-detail.component';
import {LinkClickData} from '../../../shared/models/link-click-data';
import {ContractDetailWithIds} from '../../../shared/models/contract-detail-with-ids';
import {CustomerApiService} from '../../../customers/services/customer-api.service';
import {VehicleApiService} from '../../../vehicles/services/vehicle-api.service';
import {DialogMetadata} from '../../../shared/models/dialog-metadata';
import {VehicleDetailComponent} from '../../../shared/components/vehicle-detail/vehicle-detail.component';
import {ContractDetailComponent} from '../contract-detail/contract-detail.component';
import {CommonService} from '../../../shared/common.service';
import {
  ConfirmationDialogComponent
} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-contracts-list',
  templateUrl: './contracts-list.component.html',
  styleUrls: ['./contracts-list.component.scss']
})
export class ContractsListComponent implements OnInit {
  public ButtonClickActionEnum = ButtonClickActionEnum;
  public contractsWithoutIds: ContractDetailWithoutIds[] = [];
  public contractsWithIds: ContractDetailWithIds[] = [];

  public readonly fieldsMetadata: FieldsMetadata[] = [
    {isLink: false, isCurrency: false},
    {isLink: true, isCurrency: false},
    {isLink: true, isCurrency: false},
    {isLink: false, isCurrency: false},
    {isLink: false, isCurrency: true},
    {isLink: false, isCurrency: true},
    {isLink: false, isCurrency: false},
  ];

  constructor(private dialog: MatDialog,
              private commonService: CommonService,
              private contractApiService: ContractsApiService,
              private customerApiService: CustomerApiService,
              private vehicleApiService: VehicleApiService) {
  }

  private setContractData(contracts: ContractDetailWithIds[]): void {
    this.contractsWithIds = contracts;
    this.contractsWithoutIds = [];
    contracts.forEach(contract => {
      this.contractsWithoutIds.push({
        contractNumber: contract.contractNumber,
        customerFullName: contract.customerFullName,
        vehicle: contract.vehicle,
        vin: contract.vin,
        monthlyRate: contract.monthlyRate,
        vehiclePrice: contract.vehiclePrice
      });
    });
  }

  private openContractDetailDialog(metadata: DialogMetadata, contractDetailsWithIds?: ContractDetailWithIds): void {
    const selectedContractWithIds = contractDetailsWithIds ? JSON.parse(JSON.stringify(contractDetailsWithIds)) : contractDetailsWithIds;
    const dialogRef = this.dialog.open(ContractDetailComponent, {
      width: '450px',
      data: {metadata, contractData: selectedContractWithIds},
    });

    let message = '';
    let action = '';
    dialogRef.afterClosed()
      .pipe(switchMap((contractDialogData: ContractDetailWithIds) => {
        if (contractDialogData) {
          if (contractDialogData.contractId) {
            message = 'Update contract data done!';
            action = 'Update';
            return this.contractApiService.updateContract(contractDialogData.contractId, contractDialogData);
          }
          message = 'Submit new contract done!';
          action = 'Submit';
          return this.contractApiService.addNewContract(contractDialogData);
        }
        message = 'Operation cancelled!';
        action = 'Cancel';
        return of(null);
      })).subscribe(contractsWithIds => {
      const errorDetail = this.contractApiService.getErrorDetail();
      if (errorDetail) {
        message = errorDetail.message;
        action = 'Error';
        this.contractApiService.resetErrorDetail();

      } else if (contractsWithIds) {
        this.setContractData(contractsWithIds);
      }
      this.commonService.showSnakeBar(message, action);
    });
  }

  ngOnInit(): void {
    this.contractApiService.getAllContractsWithDetails().subscribe(contracts => this.setContractData(contracts));
  }

  onClick(action: ButtonClickActionEnum, contractDetailWithoutIds?: ContractDetailWithoutIds): void {
    const dialogMetadata: DialogMetadata = {title: '', submitBtnCaption: 'Submit', cancelBtnCaption: 'Cancel'};
    switch (action) {
      case ButtonClickActionEnum.SUBMIT_NEW_CONTRACT:
        this.openContractDetailDialog({...dialogMetadata, title: 'Submit new contract'});
        break;
      case ButtonClickActionEnum.EDIT_CONTRACT:
        const selectedContractWithIds = this.contractsWithIds.find(c => c.contractNumber === contractDetailWithoutIds?.contractNumber);
        this.openContractDetailDialog({...dialogMetadata, title: 'Update contract data'}, selectedContractWithIds);
        break;
      case ButtonClickActionEnum.DELETE_CONTRACT:
        dialogMetadata.title = 'Delete contract'
        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {width: '450px', data: dialogMetadata});

        dialogRef.afterClosed().subscribe((dialogAction: ButtonClickActionEnum) => {
          switch (dialogAction) {
            case ButtonClickActionEnum.CANCEL:
              this.commonService.showSnakeBar('Delete contract cancelled!', 'Delete');
              break;
            case ButtonClickActionEnum.CONFIRM:
              if (contractDetailWithoutIds) {
                const contractDetailWithIds = this.contractsWithIds.find(c => c.contractNumber === contractDetailWithoutIds.contractNumber);
                if (contractDetailWithIds) {
                  this.contractApiService.deleteContract(contractDetailWithIds.contractId).pipe(
                    switchMap(() => {
                      this.commonService.showSnakeBar('Delete contract done.', 'Delete');
                      return this.contractApiService.getAllContractsWithDetails();
                    })
                  ).subscribe(contracts => this.setContractData(contracts));
                }
              }
              break;
          }
        });
        break;

    }
  }

  onLinkClick(linkData: LinkClickData<ContractDetailWithoutIds>): void {
    const dialogMetadata: DialogMetadata = {
      title: 'Edit data',
      submitBtnCaption: 'Save',
      cancelBtnCaption: 'Cancel'
    };

    const contractWithIds = this.contractsWithIds.find(c => c.contractNumber === linkData.data?.contractNumber);
    if (contractWithIds) {
      switch (linkData.column) {
        case 'customerFullName':
          this.customerApiService.getCustomerById(contractWithIds.customerId).pipe(
            switchMap(selectedCustomerData => {
              dialogMetadata.title = 'Edit customer data';
              return this.dialog.open(CustomerDetailComponent, {
                width: '450px', data: {customerData: selectedCustomerData, metadata: dialogMetadata}
              }).afterClosed();
            }),
            switchMap(customerUpdatedData =>
              customerUpdatedData ? this.customerApiService.updateCustomer(contractWithIds.customerId, customerUpdatedData) : of(null)
            ),
            switchMap(res => res ? this.contractApiService.getAllContractsWithDetails() : of(null)),
          ).subscribe(contracts => contracts ? this.setContractData(contracts) : null);
          break;
        case 'vehicle':
          this.vehicleApiService.getVehicleById(contractWithIds.vehicleId).pipe(
            switchMap(selectedVehicleData => {
              dialogMetadata.title = 'Edit vehicle data';
              return this.dialog.open(VehicleDetailComponent, {
                width: '450px', data: {vehicleData: selectedVehicleData, metadata: dialogMetadata}
              }).afterClosed();
            }),
            switchMap(vehicleUpdatedData =>
              vehicleUpdatedData ? this.vehicleApiService.updateVehicle(contractWithIds.vehicleId, vehicleUpdatedData) : of(null)
            ),
            switchMap(res => res ? this.contractApiService.getAllContractsWithDetails() : of(null)),
          ).subscribe(contracts => contracts ? this.setContractData(contracts) : null);
          break;
      }
    }
  }
}
