import {Component} from '@angular/core';
import {ButtonClickActionEnum} from '../../modules/shared/models/button-click-action.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
      <mat-toolbar color="primary">
          <button mat-icon-button class="example-icon" aria-label="Example icon-button with menu icon">
              <mat-icon>menu</mat-icon>
          </button>
          <span>Welcome to our leasing portal</span>
          <span class="example-spacer"></span>
          <button mat-icon-button [matTooltip]="'Home Page'" (click)="onClick(BtnActionEnum.GOTO_HOME_PAGE)">
              <mat-icon>home</mat-icon>
          </button>
          <button mat-icon-button [matTooltip]="'Change Language'">
              <mat-icon>language</mat-icon>
          </button>
      </mat-toolbar>
      <router-outlet></router-outlet>
  `,
  styles: [`
    .example-spacer {
      flex: 1 1 auto;
    }
  `]
})
export class AppComponent {
  public BtnActionEnum = ButtonClickActionEnum;

  constructor(private router: Router) {
  }

  onClick(action: ButtonClickActionEnum): void {
    switch (action) {
      case ButtonClickActionEnum.GOTO_HOME_PAGE: this.router.navigate(['/home-page']).then();
    }
  }
}
