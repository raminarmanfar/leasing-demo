import {NgModule} from '@angular/core';
import {MatListModule} from '@angular/material/list';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule, MatOptionModule} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatCardModule} from '@angular/material/card';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatSelectModule} from '@angular/material/select';
import {MatIconModule} from '@angular/material/icon';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatStepperModule} from '@angular/material/stepper';
import {MatRadioModule} from '@angular/material/radio';
import {MatSliderModule} from '@angular/material/slider';

const materials = [
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatSortModule,
  MatTooltipModule,
  MatButtonModule,
  MatDialogModule,
  MatGridListModule,
  MatSidenavModule,
  MatDatepickerModule,
  MatSelectModule,
  MatFormFieldModule,
  MatSlideToggleModule,
  MatTableModule,
  MatNativeDateModule,
  MatTabsModule,
  MatPaginatorModule,
  MatCheckboxModule,
  MatProgressBarModule,
  MatCardModule,
  MatSnackBarModule,
  MatDialogModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatAutocompleteModule,
  MatButtonToggleModule,
  MatStepperModule,
  MatOptionModule,
  MatRadioModule,
  MatSliderModule,
];

@NgModule({
  imports: materials,
  exports: materials
})
export class MaterialsModule {
}
