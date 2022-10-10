import { TestBed } from '@angular/core/testing';

import { ContractsApiService } from './contracts-api.service';

describe('ContractsApiService', () => {
  let service: ContractsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContractsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
