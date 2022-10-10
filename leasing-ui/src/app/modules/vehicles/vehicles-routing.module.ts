import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {VehiclesListComponent} from './components/vehicles-list/vehicles-list.component';
import {VehiclesContainerPageComponent} from './components/vehicles-container-page/vehicles-container-page.component';

const vehicleRoutes: Routes = [
  {path: '', redirectTo: '/vehicles/vehicles-list', pathMatch: 'full'},
  {path: 'vehicles-list', component: VehiclesListComponent}
];

@NgModule({
  imports: [
    RouterModule.forChild([{path: '', component: VehiclesContainerPageComponent, children: vehicleRoutes}])
  ]
})
export class VehiclesRoutingModule {
}
