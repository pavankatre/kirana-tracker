import { TestBed } from '@angular/core/testing';

import { DashboardTable } from './dashboard-table';

describe('DashboardTable', () => {
  let service: DashboardTable;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardTable);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
