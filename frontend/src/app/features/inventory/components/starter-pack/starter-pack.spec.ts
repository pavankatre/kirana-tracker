import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarterPack } from './starter-pack';

describe('StarterPack', () => {
  let component: StarterPack;
  let fixture: ComponentFixture<StarterPack>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StarterPack]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StarterPack);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
