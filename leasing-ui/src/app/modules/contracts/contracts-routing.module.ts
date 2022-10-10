import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ContractsListComponent} from './components/contracts-list/contracts-list.component';
import {
  ContractsContainerPageComponent
} from './components/contracts-container-page/contracts-container-page.component';

const vehicleRoutes: Routes = [
  {path: '', redirectTo: '/contracts/contracts-list', pathMatch: 'full'},
  {path: 'contracts-list', component: ContractsListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: ContractsContainerPageComponent, children: vehicleRoutes}])
  ]
})
export class ContractsRoutingModule {
}
