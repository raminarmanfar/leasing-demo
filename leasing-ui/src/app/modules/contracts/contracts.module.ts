import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractsContainerPageComponent } from './components/contracts-container-page/contracts-container-page.component';
import { ContractsListComponent } from './components/contracts-list/contracts-list.component';
import {ContractsRoutingModule} from './contracts-routing.module';
import {RouterOutlet} from '@angular/router';
import {SharedModule} from '../shared/shared.module';
import {ContractsApiService} from './services/contracts-api.service';
import { ContractDetailComponent } from './components/contract-detail/contract-detail.component';
import {ReactiveFormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    ContractsContainerPageComponent,
    ContractsListComponent,
    ContractDetailComponent
  ],
  imports: [
    CommonModule,
    ContractsRoutingModule,
    SharedModule,
    RouterOutlet,
    ReactiveFormsModule
  ],
  providers: [ContractsApiService]
})
export class ContractsModule { }
