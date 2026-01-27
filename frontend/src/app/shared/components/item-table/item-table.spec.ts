import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemTable } from './item-table';

describe('ItemTable', () => {
  let component: ItemTable;
  let fixture: ComponentFixture<ItemTable>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ItemTable]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemTable);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
