import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {CustomersListComponent} from './components/customers-list/customers-list.component';
import {
  CustomersContainerPageComponent
} from './components/customers-container-page/customers-container-page.component';

const customersRoutes: Routes = [
  {path: '', redirectTo: '/customers/customers-list', pathMatch: 'full'},
  {path: 'customers-list', component: CustomersListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: CustomersContainerPageComponent, children: customersRoutes}])
  ]
})
export class CustomersRoutingModule { }
