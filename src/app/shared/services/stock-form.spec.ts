import { TestBed } from '@angular/core/testing';

import { StockFormService } from './stock-form';

describe('StockForm', () => {
  let service: StockFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StockFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
