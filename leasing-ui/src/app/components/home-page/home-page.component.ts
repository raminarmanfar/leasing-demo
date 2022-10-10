import {Component} from '@angular/core';
import {ButtonModel} from '../../modules/shared/models/button.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home-page',
  template: `
    <div class="main-container">
      <img [src]="'./assets/images/leasing-auto-01.jpg'" alt="leasing" class="banner">

      <div class="btn-container">
        <app-card-button
          class="btn" *ngFor="let buttonData of buttons" [buttonData]="buttonData"
          (btnClick)="router.navigate([$event.routeUrl]).then()">
        </app-card-button>
      </div>
    </div>`,
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {

  public buttons: ButtonModel[] = [
    {caption: 'Vehicles', iconName: 'directions_car', routeUrl: 'vehicles'},
    {caption: 'Customers', iconName: 'person', routeUrl: 'customers'},
    {caption: 'Contracts', iconName: 'folder_shared', routeUrl: 'contracts'},
  ];

  constructor(public router: Router) {
  }
}
