import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomersContainerPageComponent } from './customers-container-page.component';

describe('CustomersContainerPageComponent', () => {
  let component: CustomersContainerPageComponent;
  let fixture: ComponentFixture<CustomersContainerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustomersContainerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomersContainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
