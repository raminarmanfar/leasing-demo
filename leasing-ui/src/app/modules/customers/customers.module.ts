import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterOutlet} from '@angular/router';
import {CustomersListComponent} from './components/customers-list/customers-list.component';
import {
  CustomersContainerPageComponent
} from './components/customers-container-page/customers-container-page.component';
import {CustomerApiService} from './services/customer-api.service';
import {CustomersRoutingModule} from './customers-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  declarations: [
    CustomersListComponent,
    CustomersContainerPageComponent,
  ],
  imports: [
    CommonModule,
    CustomersRoutingModule,
    SharedModule,
    RouterOutlet,
  ],
  providers: [CustomerApiService]
})
export class CustomersModule { }
