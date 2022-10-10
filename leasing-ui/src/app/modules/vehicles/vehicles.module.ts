import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VehiclesContainerPageComponent } from './components/vehicles-container-page/vehicles-container-page.component';
import { VehiclesListComponent } from './components/vehicles-list/vehicles-list.component';
import {VehiclesRoutingModule} from './vehicles-routing.module';
import {RouterOutlet} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {VehicleApiService} from './services/vehicle-api.service';



@NgModule({
  declarations: [
    VehiclesContainerPageComponent,
    VehiclesListComponent
  ],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    SharedModule,
    RouterOutlet
  ],
  providers: [VehicleApiService]
})
export class VehiclesModule { }
