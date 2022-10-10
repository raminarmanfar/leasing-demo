import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {HomePageComponent} from './components/home-page/home-page.component';

const routes: Routes = [
  {path: '', redirectTo: '/home-page', pathMatch: 'full'},
  {path: 'home-page', component: HomePageComponent},
  {path: 'customers', loadChildren: () => import('./modules/customers/customers.module').then(p => p.CustomersModule)},
  {path: 'vehicles', loadChildren: () => import('./modules/vehicles/vehicles.module').then(p => p.VehiclesModule)},
  {path: 'contracts', loadChildren: () => import('./modules/contracts/contracts.module').then(p => p.ContractsModule)},
  {path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
