import { TestBed } from '@angular/core/testing';

import { InventoryViewService } from './inventory-view';

describe('InventoryView', () => {
  let service: InventoryViewService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InventoryViewService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
