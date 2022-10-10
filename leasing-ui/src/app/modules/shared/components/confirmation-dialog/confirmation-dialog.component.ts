import {Component, Inject} from '@angular/core';
import {DialogMetadata} from '../../models/dialog-metadata';
import {ButtonClickActionEnum} from '../../models/button-click-action.enum';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  template: `
    <mat-card>
      <mat-card-title>{{ data.title }}</mat-card-title>
      <mat-card-subtitle>{{ data.subtitle }}</mat-card-subtitle>
      <mat-card-actions>
        <button mat-raised-button color="primary" class="btn" (click)="dialogRef.close(ButtonClickActionEnum.CONFIRM)">
          {{ data.submitBtnCaption }}
        </button>
        <button mat-raised-button color="accent" class="btn" (click)="dialogRef.close(ButtonClickActionEnum.CANCEL)">
          {{ data.cancelBtnCaption }}
        </button>
      </mat-card-actions>
    </mat-card>`,
  styles: [`
    .btn {
      width: 120px;
      margin: 10px;
    }
  `]
})
export class ConfirmationDialogComponent {
  public readonly ButtonClickActionEnum = ButtonClickActionEnum;

  constructor(public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogMetadata) {
  }
}
