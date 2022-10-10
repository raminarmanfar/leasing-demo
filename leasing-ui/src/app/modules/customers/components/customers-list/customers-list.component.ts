import {Component, OnInit} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {of, switchMap} from 'rxjs';
import {CustomerApiService} from '../../services/customer-api.service';
import {CommonService} from '../../../shared/common.service';
import {CustomerMinimalData, CustomerWithContracts, CustomerWithFullName} from '../../../shared/models/customer.model';
import {FieldsMetadata} from '../../../shared/models/fields-metadata';
import {ButtonClickActionEnum} from '../../../shared/models/button-click-action.enum';
import {CustomerDetailComponent} from '../../../shared/components/customer-detail/customer-detail.component';
import {DialogMetadata} from '../../../shared/models/dialog-metadata';
import {
  ConfirmationDialogComponent
} from '../../../shared/components/confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-customers-list',
  templateUrl: './customers-list.component.html',
  styleUrls: ['./customers-list.component.scss']
})
export class CustomersListComponent implements OnInit {
  public readonly ButtonClickActionEnum = ButtonClickActionEnum;

  customers: CustomerWithFullName[] = [];
  customersWithContracts: CustomerWithContracts[] = [];
  fieldsMetadata: FieldsMetadata[] = [
    {isLink: false, isCurrency: false},
    {isLink: false, isCurrency: false},
    {isLink: false, isCurrency: false},
    {isLink: false, isCurrency: false},
  ];

  constructor(private customerApiService: CustomerApiService,
              private dialog: MatDialog,
              private commonService: CommonService) {
  }

  private generateTableData(customers: CustomerWithContracts[]): CustomerWithFullName[] {
    const customersWithFullName: CustomerWithFullName[] = [];
    customers.forEach(customer => {
      customersWithFullName.push({
        id: customer.id,
        name: customer.firstname + ' ' + customer.lastname,
        birthdate: CommonService.convertDateFormat(customer.birthdate)
      });
    });
    return customersWithFullName;
  }

  private setFetchedCustomersData(customers: CustomerWithContracts[]): void {
    this.customersWithContracts = customers;
    this.customers = this.generateTableData(customers);
  }

  private openCustomerDialog(customerFetchedData?: CustomerWithContracts): void {
    const metadata: DialogMetadata = {
      title: customerFetchedData ? 'Edit Customer data' : 'Add new Customer',
      submitBtnCaption: 'Save',
      cancelBtnCaption: 'Cancel'
    };

    const dialogRef = this.dialog.open(CustomerDetailComponent, {
      width: '450px', data: {customerData: customerFetchedData, metadata},
    });

    dialogRef.afterClosed().pipe(
      switchMap((customerData: CustomerMinimalData) => {
        if (customerData) {
          if (customerFetchedData) {
            this.commonService.showSnakeBar('Update user done!', 'Update');
            return this.customerApiService.updateCustomer(customerFetchedData.id, customerData);
          }
          this.commonService.showSnakeBar('Add new user done!', 'Add');
          return this.customerApiService.addNewCustomer(customerData)
        }
        this.commonService.showSnakeBar('Action is cancelled!', 'Cancel');
        return [];
      })
    ).subscribe(customers => {
      if (customers) {
        this.setFetchedCustomersData(customers);
      }
    });
  }

  ngOnInit(): void {
    this.customerApiService.getAllCustomers().subscribe(customers => this.setFetchedCustomersData(customers));
  }

  onClick(action: ButtonClickActionEnum, selectedCustomerData?: CustomerWithFullName): void {
    switch (action) {
      case ButtonClickActionEnum.ADD_NEW_CUSTOMER:
        this.openCustomerDialog();
        break;
      case ButtonClickActionEnum.EDIT_CUSTOMER:
        const customerData = this.customersWithContracts.find(c => c.id === selectedCustomerData?.id);
        this.openCustomerDialog(customerData);
        break;
      case ButtonClickActionEnum.DELETE_CUSTOMER:
        const data: DialogMetadata = {
          title: `Delete Customer (${selectedCustomerData?.name}) data`,
          submitBtnCaption: 'Delete',
          cancelBtnCaption: 'Cancel'
        };

        const dialogRef = this.dialog.open(ConfirmationDialogComponent, {width: '600px', data});

        dialogRef.afterClosed().subscribe((action: ButtonClickActionEnum) => {
          switch (action) {
            case ButtonClickActionEnum.CANCEL:
              this.commonService.showSnakeBar('Delete customer cancelled!', 'Delete');
              break;
            case ButtonClickActionEnum.CONFIRM:
              if (selectedCustomerData) {
                this.customerApiService.isCustomerDeletable(selectedCustomerData.id).pipe(
                  switchMap(requestStatus => {
                    if (requestStatus.hasError) {
                      this.commonService.showSnakeBar(requestStatus.message, 'Unsuccessful');
                      return of(requestStatus);
                    }

                    this.commonService.showSnakeBar('Delete customer success!', 'Delete');
                    return this.customerApiService.deleteCustomer(selectedCustomerData.id);
                  }),
                  switchMap(res => res === true ? of(null) : this.customerApiService.getAllCustomers())
                ).subscribe(customers => {
                  if (customers) {
                    this.setFetchedCustomersData(customers);
                  }
                });
              }
              break;
          }
        });
        break;
    }
  }
}
