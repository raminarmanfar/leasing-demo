import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import {AppComponent} from './components/app-component/app.component';
import {AppRoutingModule} from './app-routing.module';
import {CardButtonComponent} from './components/card-button/card-button.component';
import {PageNotFoundComponent} from './components/page-not-found/page-not-found.component';
import {CustomersModule} from './modules/customers/customers.module';
import {HomePageComponent} from './components/home-page/home-page.component';
import {VehiclesModule} from './modules/vehicles/vehicles.module';
import {ContractsModule} from './modules/contracts/contracts.module';
import {TableComponent} from './modules/shared/components/table/table.component';
import {SharedModule} from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    CardButtonComponent,
    PageNotFoundComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    CustomersModule,
    VehiclesModule,
    ContractsModule,
    SharedModule
  ],
  providers: [],
  exports: [
    TableComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
