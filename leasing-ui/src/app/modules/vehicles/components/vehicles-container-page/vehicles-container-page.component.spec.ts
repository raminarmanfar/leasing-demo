import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesContainerPageComponent } from './vehicles-container-page.component';

describe('VehiclesContainerPageComponent', () => {
  let component: VehiclesContainerPageComponent;
  let fixture: ComponentFixture<VehiclesContainerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiclesContainerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesContainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
