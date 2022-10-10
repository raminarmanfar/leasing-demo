import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModel} from '../../modules/shared/models/button.model';

@Component({
  selector: 'app-card-button',
  template: `
    <button mat-stroked-button color="primary" class="btn" [matTooltipPosition]="'above'"
            [matTooltip]="buttonData.caption" (click)="btnClick.emit(buttonData)">
      <span class="material-icons icon">{{buttonData.iconName}}</span> {{ buttonData.caption }}
    </button>
  `,
  styles: [`
    .btn {width: 350px; height: 100px; font-size: xx-large;}
    .icon {font-size: 100px; width: fit-content; height: fit-content;}`
  ]
})
export class CardButtonComponent {
  @Input() buttonData: ButtonModel = new ButtonModel;
  @Output() btnClick = new EventEmitter<ButtonModel>();
}
