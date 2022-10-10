import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContractsContainerPageComponent } from './contracts-container-page.component';

describe('ContractsContainerPageComponent', () => {
  let component: ContractsContainerPageComponent;
  let fixture: ComponentFixture<ContractsContainerPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContractsContainerPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContractsContainerPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
